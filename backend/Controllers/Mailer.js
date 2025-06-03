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


// welcome mail to registered user

const sendWelcomemail = async (email, name) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Welcome to ShowTime - Your Event Management Platform',
        html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: 'Segoe UI', 'Roboto', Arial, sans-serif; background-color: #f8f9fa; padding: 0;">
            
            
            <!-- Main Content -->
            <div style="background-color: #ffffff; padding: 40px 32px;">
                
                <!-- Welcome Message -->
                <h1 style="font-size: 28px; font-weight: 700; color: #2d3748; margin: 0 0 16px 0; text-align: center;">
                    Welcome to ShowTime!
                </h1>
                
                <p style="font-size: 18px; color: #4a5568; line-height: 1.6; margin: 0 0 32px 0; text-align: center;">
                    Hello ${name}! 👋
                </p>
                
                <p style="font-size: 16px; color: #4a5568; line-height: 1.6; margin: 0 0 32px 0;">
                    Welcome to ShowTime, where your events get a visual upgrade. Whether it's tickets for your next big gig, a technical blog post, or your next LinkedIn update, we're here to unlock the visual potential of your text.
                </p>
                
                <!-- How It Works Section -->
                <h2 style="font-size: 24px; font-weight: 600; color: #2d3748; margin: 32px 0 24px 0;">
                    How It Works
                </h2>
                
                <!-- Step 1 -->
                <div style="display: flex; align-items: flex-start; margin-bottom: 24px; padding: 20px; background-color: #f7fafc; border-radius: 12px; border-left: 4px solid #667eea;">
                    <div style="background-color: #667eea; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; margin-right: 16px; flex-shrink: 0;">
                        1
                    </div>
                    <div>
                        <h3 style="font-size: 18px; font-weight: 600; color: #2d3748; margin: 0 0 8px 0;">
                            🎯 Create Your Event
                        </h3>
                        <p style="font-size: 14px; color: #4a5568; line-height: 1.5; margin: 0;">
                            Use our intuitive dashboard to add event details like time, venue, pricing, and categories. Add custom branding, seating maps, and ticket tiers.
                        </p>
                    </div>
                </div>
                
                <!-- Step 2 -->
                <div style="display: flex; align-items: flex-start; margin-bottom: 24px; padding: 20px; background-color: #f0fff4; border-radius: 12px; border-left: 4px solid #48bb78;">
                    <div style="background-color: #48bb78; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; margin-right: 16px; flex-shrink: 0;">
                        2
                    </div>
                    <div>
                        <h3 style="font-size: 18px; font-weight: 600; color: #2d3748; margin: 0 0 8px 0;">
                            🎫 Sell Tickets
                        </h3>
                        <p style="font-size: 14px; color: #4a5568; line-height: 1.5; margin: 0;">
                            Easily publish your event and start selling tickets directly. Share your unique event link, embed it on websites, or promote via social media.
                        </p>
                    </div>
                </div>
                
                <!-- Step 3 -->
                <div style="display: flex; align-items: flex-start; margin-bottom: 32px; padding: 20px; background-color: #fffaf0; border-radius: 12px; border-left: 4px solid #ed8936;">
                    <div style="background-color: #ed8936; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; margin-right: 16px; flex-shrink: 0;">
                        3
                    </div>
                    <div>
                        <h3 style="font-size: 18px; font-weight: 600; color: #2d3748; margin: 0 0 8px 0;">
                            📊 Track Sales & Analytics
                        </h3>
                        <p style="font-size: 14px; color: #4a5568; line-height: 1.5; margin: 0;">
                            Access real-time analytics to monitor revenue, ticket sales, attendee demographics, and conversion rates — all from one clean dashboard.
                        </p>
                    </div>
                </div>
                
                <div style="text-align: center; margin: 40px 0;">
                    <a href="https://show-time-six.vercel.app" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-size: 16px; font-weight: 600; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);">
                        Get Started with ShowTime
                    </a>
                </div>
                <!-- Closing -->
                <p style="font-size: 14px; color: #4a5568; line-height: 1.5; margin: 32px 0 0 0;">
                    Happy creating!<br>
                    <strong>The ShowTime Team</strong>
                </p>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #2d3748; padding: 24px; text-align: center;">
                <div style="color: #ffffff; font-size: 20px; font-weight: 600; margin-bottom: 8px;">
                    ShowTime
                </div>
                <p style="color: #a0aec0; font-size: 12px; margin: 0;">
                    Copyright © 2024 ShowTime. All rights reserved.
                </p>
                <p style="color: #a0aec0; font-size: 12px; margin: 8px 0 0 0;">
                    Create. Sell. Manage. Your events, simplified.
                </p>
            </div>
        </div>
    `
    };


    await transporter.sendMail(mailOptions);
}


module.exports = {
    generateOTP,
    sendOTPEmail,
    sendWelcomemail
};
