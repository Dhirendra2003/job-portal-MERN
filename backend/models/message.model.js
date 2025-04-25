import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    // roomName: {
    //     type: String,
    //     required: true
    // },
    //add job id and company id
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    recruiterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    applicantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    chats : [{
        sender: {
            type: String,
            enum: ["applicant", "recruiter"],
            required: true
        },
        message: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
    }]
}, { timestamps: true });

export const Message = mongoose.model('Message', MessageSchema);