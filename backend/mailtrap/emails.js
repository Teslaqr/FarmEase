
import { PASSWORD_RESET_REQUEST_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } from "./emailTemplates.js";
import { transporter, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
    const mailOptions = {
        from: sender,
        to: email,
        subject: "Verify your Email",
        html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
    };

    try {
        const response = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully", response);
    } catch (error) {
        console.error(`Error sending verification email`, error);
        throw new Error(`Error sending verification email: ${error}`);
    }
};

export const sendWelcomeEmail = async (email, name) => {
    const mailOptions = {
        from: sender,
        to: email,
        subject: "Welcome!",
        html: `<p>Hello ${name},</p><p>Welcome to FarmSpace !</p>`, 
    };

    try {
        const response = await transporter.sendMail(mailOptions);
        console.log("Welcome email sent successfully", response);
    } catch (error) {
        console.error(`Error sending welcome email`, error);
        throw new Error(`Error sending welcome email: ${error}`);
    }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
    const mailOptions = {
        from: sender,
        to: email,
        subject: "Reset your password",
        html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
    };

    try {
        const response = await transporter.sendMail(mailOptions);
        console.log("Password reset email sent successfully", response);
    } catch (error) {
        console.error(`Error sending password reset email`, error);
        throw new Error(`Error sending password reset email: ${error}`);
    }
};

export const sendResetSuccessEmail = async (email) => {
    const mailOptions = {
        from: sender,
        to: email,
        subject: "Password Reset Successfully",
        html: PASSWORD_RESET_SUCCESS_TEMPLATE,
    };

    try {
        const response = await transporter.sendMail(mailOptions);
        console.log("Password reset success email sent successfully", response);
    } catch (error) {
        console.error(`Error sending password reset success email`, error);
        throw new Error(`Error sending password reset success email: ${error}`);
    }
};


// for dotenv file 

// SMTP_HOST=smtp.gmail.com
// SMTP_PORT=587
// SMTP_USER=your_email@gmail.com
// SMTP_PASS=your_email_password
