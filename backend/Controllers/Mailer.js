const createTransport = require('nodemailer').createTransport;

const transporter = createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Generate random OTP
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP email
const sendOTPEmail = async (email, otp) => {
    const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Verify your email',
    html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: 'Google Sans', 'Roboto', Arial, sans-serif; background-color: #ffffff; padding: 40px 20px;">
            

            <div style="background-color: #ffffff; border: 1px solid #dadce0; border-radius: 8px; padding: 40px 32px; text-align: center;">
                <h1 style="font-size: 24px; font-weight: 400; color: #202124; margin: 0 0 24px 0; line-height: 32px;">
                    Email verification code for your account
                </h1>
                
                
                <p style="font-size: 14px; color: #5f6368; line-height: 20px; margin: 0 0 32px 0; text-align: left;">
                    Thank you for showing interest in <b>showTime</b>. To complete your registration, please verify your email address by entering the code below.
                </p>
                
                <div style="background-color: #f8f9fa; border: 1px solid #e8eaed; border-radius: 8px; padding: 24px; margin: 32px 0;">
                    <p style="font-size: 14px; color: #5f6368; margin: 0 0 8px 0;">Your verification code is:</p>
                    <div style="font-size: 32px; font-weight: 500; color: #1a73e8; letter-spacing: 8px; font-family: 'Courier New', monospace;">${otp}</div>
                    <p style="font-size: 12px; color: #5f6368; margin: 8px 0 0 0;">This code will expire in 5 minutes.</p>
                </div>
            </div>

            <div style="text-align: center; margin-top: 32px;">
                <p style="font-size: 12px; color: #5f6368; margin: 0;">
                    This email was sent to verify your email address for security purposes.
                </p>
            </div>
        </div>
    `
};

    await transporter.sendMail(mailOptions);
};

module.exports = {
    generateOTP,
    sendOTPEmail
};
