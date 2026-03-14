const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

// Configure email transport
const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
        user: 'Admin@flykuber.com', // Your Gmail address
        pass: 'Flykuber@123'     // Replace with app password
    }
});

// Send email function
exports.sendContactEmail = functions.https.onCall(async (data, context) => {
    const { name, email, phone, message } = data;
    
    const mailOptions = {
        from: 'FlyKuber <yashasvipratap7@gmail.com>',
        to: 'kronos5307@gmail.com', // Your business email
        subject: `New Contact Form Submission - ${name}`,
        html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
            <hr>
            <p><em>Sent from FlyKuber Website</em></p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        return { success: true, message: 'Email sent successfully' };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, message: 'Failed to send email' };
    }
});

// HTTP function for form submission
exports.sendContactForm = functions.https.onRequest(async (req, res) => {
    // Enable CORS
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, POST');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        res.status(204).send('');
        return;
    }

    if (req.method !== 'POST') {
        res.status(405).send('Method not allowed');
        return;
    }

    try {
        const { name, email, phone, message } = req.body;
        
        const mailOptions = {
            from: 'Kuber Aviation Website <yashasvipratap7@gmail.com>',
            to: 'kronos5307@gmail.com', // Your business email
            subject: `New Contact Form Submission - ${name}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
                <hr>
                <p><em>Sent from Kuber Aviation Website</em></p>
            `
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: 'Failed to send email' });
    }
});
