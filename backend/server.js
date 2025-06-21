
require('dotenv').config();
const express    = require('express');
const cors       = require('cors');
const jwt        = require('jsonwebtoken');
const bcrypt     = require('bcryptjs');
const nodemailer = require('nodemailer');
const { OAuth2Client } = require('google-auth-library');
const { v4: uuidv4 }  = require('uuid');
const db         = require('./firebase-init');
const multer     = require('multer');
const cloudinary= require('cloudinary').v2;
const { Readable } = require('stream');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 📁 Multer setup to handle multipart form-data
const storage = multer.memoryStorage();
const upload = multer({ storage });

const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());

const sanitizeKey = str => str.replace(/[.#$\[\]/]/g, ',');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.SMTP_USER,
    clientId: process.env.SMTP_CLIENT_ID,
    clientSecret: process.env.SMTP_CLIENT_SECRET,
    refreshToken: process.env.SMTP_REFRESH_TOKEN,
  },
});


const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();
async function initMainAdmin() {
  const snap = await db
    .ref('admins')
    .orderByChild('isMain')
    .equalTo(true)
    .once('value');

  if (!snap.exists()) {
    const hashed = await bcrypt.hash(process.env.MAIN_ADMIN_PASSWORD, 10);
    await db.ref('admins').push({
      name:  process.env.MAIN_ADMIN_NAME,
      email: process.env.MAIN_ADMIN_EMAIL,
      password: hashed,
      isMain: true,
    });
    console.log('✅ Main admin initialized');
  }

  // Initialize contributors count if not exists
  const contributorSnap = await db.ref('contributors').once('value');
  if (!contributorSnap.exists()) {
    await db.ref('contributors').set({ count: 0 });
  }
}

app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});

app.get("/", (req, res) => {
  res.send("Backend is working!");
});


// Get contributor count
// Modify your contributors endpoint
app.get('/api/admins/contributors', async (req, res) => {
  try {
    const snap = await db.ref('contributors').once('value');
    const count = snap.val()?.count || 0; // Proper null check
    res.json({ count });
  } catch (err) {
    console.error('Failed to fetch contributors:', err);
    res.status(500).json({ count: 0 }); 
  }
});

// 1) LOGIN: email+password → sends OTP
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const snap = await db
      .ref('admins')
      .orderByChild('email')
      .equalTo(email)
      .once('value');
    const admins = snap.val() || {};
    const entry = Object.entries(admins)[0];
    if (!entry) return res.status(401).json({ error: 'Invalid credentials' });

    const [, admin] = entry;
    const match = await bcrypt.compare(password, admin.password);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    const otp = generateOTP();
    await transporter.sendMail({
      to: email,
      subject: 'Your Login OTP',
      text: `Your OTP is: ${otp}`,
    });

    const key = sanitizeKey(email);
    await db.ref(`otps/${key}`).set({
      otp,
      expires: Date.now() + 5 * 60 * 1000,
    });

    res.json({ message: 'OTP sent to your email' });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// 2) VERIFY OTP for login → returns JWT + isMain flag
app.post('/api/verify-otp', async (req, res) => {
  const { email, otp } = req.body;
  const key = sanitizeKey(email);
  const snap = await db.ref(`otps/${key}`).once('value');
  const data = snap.val();
  if (!data || data.otp !== otp || Date.now() > data.expires) {
    return res.status(400).json({ error: 'Invalid or expired OTP' });
  }
  await db.ref(`otps/${key}`).remove();

  const adminSnap = await db
    .ref('admins')
    .orderByChild('email')
    .equalTo(email)
    .once('value');
  const admins = adminSnap.val() || {};
  const [[, adminRecord]] = Object.entries(admins);
  const isMain = !!adminRecord.isMain;

  // ✅ Choose name based on admin type
  const name = isMain ? process.env.MAIN_ADMIN_NAME : adminRecord.name;

  const token = jwt.sign(
    { email, isMain },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({ token, isMain, name });
});


// ——————————————————————————
// 2) REQUEST new admin → approval token
// ——————————————————————————
app.post('/api/request-admin', async (req, res) => {
  const { name, email, password } = req.body;
  const key = sanitizeKey(email);

  const [existsAdmins, existsPending] = await Promise.all([
    db.ref('admins').orderByChild('email').equalTo(email).once('value'),
    db.ref('pendingAdmins').orderByChild('email').equalTo(email).once('value'),
  ]).then(([a, p]) => [a.exists(), p.exists()]);

  if (existsAdmins) {
    return res.status(400).json({ error: 'Email already registered' });
  }

  try {
    const hashed  = await bcrypt.hash(password, 10);
    const token   = uuidv4();
    const expires = Date.now() + 24*60*60*1000; // 24h

    await db.ref(`pendingAdmins/${key}`).set({
      name, email, password: hashed, token, expires,
    });

    const approvalUrl = `${process.env.FRONTEND_URL}/approve-admin?token=${token}`;
    await transporter.sendMail({
      to: process.env.MAIN_ADMIN_EMAIL,
      subject: 'Approve New Admin Request',
      html: `
        <p><strong>${name}</strong> (${email}) has requested an admin account.</p>
        <p>
          <a href="${approvalUrl}"
             style="
               display:inline-block;
               padding:12px 24px;
               background:#28a745;
               color:#fff;
               text-decoration:none;
               border-radius:4px;
             ">
            Approve Account
          </a>
        </p>
        <p>If you did not expect this, ignore this email.</p>
      `,
    });

    res.json({ message: 'Awaiting main admin approval' });
  } catch (err) {
    console.error('REQUEST-ADMIN ERROR:', err);
    res.status(500).json({ error: err.message });
  }
});

// ——————————————————————————
// 3) APPROVE via link (UPDATED VERSION)
// ——————————————————————————
app.get('/api/approve-admin', async (req, res) => {
  const { token } = req.query;
  if (!token) return res.status(400).send('Missing token');

  const snap = await db.ref('pendingAdmins').once('value');
  let pendingKey, p;
  snap.forEach(child => {
    if (child.val().token === token) {
      pendingKey = child.key;
      p = child.val();
    }
  });

  if (!p || Date.now() > p.expires) {
    return res.status(400).send('Token invalid or expired');
  }

  try {
    await db.ref('admins').push({
      name: p.name,
      email: p.email,
      password: p.password,
      isMain: false,
    });

    // Then update contributor count using transaction
    const contributorsRef = db.ref('contributors');
    await contributorsRef.transaction((currentData) => {
      if (currentData === null) {
        return { count: 1 }; // Initialize if doesn't exist
      }
      currentData.count = (currentData.count || 0) + 1;
      return currentData;
    });

    // Clean up pending admin
    await db.ref(`pendingAdmins/${pendingKey}`).remove();

    // Send confirmation email
    await transporter.sendMail({
      to: p.email,
      subject: 'Your Admin Account Is Live!',
      text: `Hi ${p.name},\n\nYour request has been approved. You can now log in at ${process.env.FRONTEND_URL}/admin/login.\n\n— The Team`,
    });

    res.send(`
      <h1>✅ Admin Approved</h1>
      <p>You have successfully approved <strong>${p.email}</strong> as an admin.</p>
    `);
  } catch (err) {
    console.error('Approval error:', err);
    res.status(500).send('Server error during approval');
  }
});




// 5) FORGOT PASSWORD: send reset OTP
app.post('/api/reset-password', async (req, res) => {
  const { email } = req.body;
  const snap = await db.ref('admins').orderByChild('email').equalTo(email).once('value');
  if (!snap.exists()) {
    return res.status(404).json({ error: 'Email not found' });
  }

  const otp = generateOTP();
  await transporter.sendMail({
    to: email,
    subject: 'Password Reset OTP',
    text: `Your OTP is: ${otp}`,
  });

  const key = sanitizeKey(email);
  await db.ref(`otps/${key}`).set({ otp, expires: Date.now() + 5 * 60 * 1000 });
  res.json({ message: 'OTP sent for password reset' });
});

// 6) RESET PASSWORD with OTP
app.post('/api/reset-password-confirm', async (req, res) => {
  const { email, otp, newPassword } = req.body;
  const key = sanitizeKey(email);
  const snap = await db.ref(`otps/${key}`).once('value');
  const data = snap.val();

  if (!data || data.otp !== otp || Date.now() > data.expires) {
    return res.status(400).json({ error: 'Invalid or expired OTP' });
  }

  const hashed = await bcrypt.hash(newPassword, 10);
  const adminSnap = await db.ref('admins').orderByChild('email').equalTo(email).once('value');
  const adminKey = Object.keys(adminSnap.val())[0];

  await db.ref(`admins/${adminKey}`).update({ password: hashed });
  await db.ref(`otps/${key}`).remove();
  res.json({ message: 'Password has been updated' });
});

// 7) GOOGLE LOGIN
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
app.post('/api/google-login', async (req, res) => {
  const { token } = req.body;
  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (!payload.email_verified) {
      return res.status(401).json({ error: 'Google email not verified' });
    }

    const snap = await db.ref('admins')
      .orderByChild('email')
      .equalTo(payload.email)
      .once('value');
    if (!snap.exists()) {
      return res.status(403).json({ error: 'Email not registered as admin' });
    }

    const [[, adminRecord]] = Object.entries(snap.val());
    const isMain = !!adminRecord.isMain;

    // ✅ Name based on role: main admin uses env name
    const name = isMain ? process.env.MAIN_ADMIN_NAME : adminRecord.name;

    const jwtToken = jwt.sign(
      { email: payload.email, isMain },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.json({ token: jwtToken, user: { name, email: payload.email }, isMain });
  } catch (err) {
    console.error('Google login error:', err);
    res.status(401).json({ error: 'Invalid Google token' });
  }
});


// Get all admins
app.get('/api/admin/all', async (req, res) => {
  try {
    const snap = await db.ref('admins').once('value');
    const admins = snap.val() || {};

    const adminList = Object.values(admins)
      .filter(admin => !admin.isMain) // <-- Exclude main admin
      .map(({ name, email, isMain }) => ({
        name,
        email,
        isMain,
      }));

    res.json({ admins: adminList });
  } catch (err) {
    console.error('Fetch admins error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});


// Delete admin by email (with thank you email)
app.delete('/api/admin/delete/:email', async (req, res) => {
  const { email } = req.params;
  try {
    const snap = await db.ref('admins').orderByChild('email').equalTo(email).once('value');
    const admins = snap.val();
    if (!admins) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    const adminKey = Object.keys(admins)[0];
    const deletedAdmin = admins[adminKey];

    // Delete from database
    await db.ref(`admins/${adminKey}`).remove();

    // Send thank you email
    await transporter.sendMail({
      to: email,
      subject: 'Thank You for Being an Admin!',
      text: `
Dear ${deletedAdmin.name || 'Admin'},

We want to extend our heartfelt thanks for your time and dedication as an admin on our platform.

Your efforts in helping students by uploading semester papers and study materials have truly made a difference. Whether you're in your 1st, 2nd, 3rd, or 4th year, your contribution has been valuable and inspiring to many.

It was wonderful to have you as part of the admin team. Your work and willingness to support fellow students reflect the true spirit of collaboration and generosity.

Although your admin access has now been removed, we want you to know how much we appreciate everything you've done.

Wishing you all the best in your journey ahead!

Warm regards,  
The Admin Team
      `.trim(),
    });

    res.json({ message: 'Admin deleted and thanked via email successfully' });
  } catch (err) {
    console.error('Delete admin error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});



// 📤 Upload API: POST /api/upload
app.post('/api/upload', upload.single('file'), async (req, res) => {
  const { title, semester, branch, subject, year, paperType } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    // Convert buffer to stream
    const bufferStream = new Readable();
    bufferStream.push(file.buffer);
    bufferStream.push(null);

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: `materials/${semester}/${branch}/${subject}/${year}/${paperType}` },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      bufferStream.pipe(uploadStream);
    });

    // 📦 Save metadata to Firebase
    const doc = {
      title,
      url: result.secure_url,
      semester,
      branch,
      subject,
      year,
      paperType,
      uploadedAt: Date.now(),
    };

    const path = `materials/${semester}/${branch}/${subject}/${year}/${paperType}`;
    await db.ref(path).push(doc);

    res.json({ message: 'Upload successful', data: doc });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Upload failed' });
  }
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  try {
    await initMainAdmin();
    console.log(`🚀 Server running on port ${PORT}`);
  } catch (err) {
    console.error('Failed to init main admin:', err);
  }
});








// 


