// import express from 'express';
// import mongoose from 'mongoose';

// const userSchema=new mongoose.Schema({
//     email:{
//         type:String,
//         required:true,
//         unique:true
//     },
//     password:{
//         type:String,
//         required:true
//     },
//     name:{
//         type:String,
//         required:true
//     },
//     lasLogin:{
//         type:Date,
//         default:Date.now
//     },
//     isVerified:{
//         type:Boolean,
//         default:false
//     },
//     resetPasswordToken:String,
//     resetPasswordExpiresAt:Date,
//     verificationToken:String,
//     verificationTokenExpiresAt:Date,
// },{timestamps:true});

// export const User =mongoose.model('User',userSchema);

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    lastLogin: {
        type: Date,
        default: Date.now
    },
    profileImage: {
        type: String,
        default: ""
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    additionalFields: {  // Flexible field for storing additional user data
        type: Map,
        of: String
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);
