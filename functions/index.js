const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors')({
  origin: [
    'https://gowreesh-vt.github.io',
    'https://your-custom-domain.com',
    /.*\.firebaseapp\.com$/,
    /.*\.web\.app$/
  ]
});

admin.initializeApp();

// Email configuration using Gmail
const gmailEmail = functions.config().gmail.email || 'your-gmail@gmail.com';
const gmailPassword = functions.config().gmail.password || 'your-app-password';

const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword
  }
});

// Main contact form function
exports.sendContactEmail = functions.https.onRequest((req, res) => {
  return cors(req, res, async () => {
    // Only allow POST requests
    if (req.method !== 'POST') {
      return res.status(405).json({success: false, message: 'Method not allowed'});
    }

    try {
      const { name, email, subject, message } = req.body;

      // Validation
      if (!name || !email || !message) {
        return res.status(400).json({
          success: false,
          message: 'Name, email, and message are required'
        });
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid email format'
        });
      }

      // Save to Firestore with additional metadata
      const docRef = await admin.firestore().collection('contact_submissions').add({
        name: name.trim(),
        email: email.trim(),
        subject: subject ? subject.trim() : 'New Contact Form Submission',
        message: message.trim(),
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        ip: req.ip,
        userAgent: req.get('User-Agent'),
        origin: req.get('Origin') || req.get('Referer') || 'Unknown',
        processed: false
      });

      console.log(`Contact submission saved with ID: ${docRef.id}`);

      // Prepare email
      const emailSubject = subject ? subject.trim() : 'New Contact Form Submission';
      const mailOptions = {
        from: `"Portfolio Contact Form" <${gmailEmail}>`,
        to: 'vt.gowreesh43@gmail.com',
        replyTo: `"${name.trim()}" <${email.trim()}>`,
        subject: `[Portfolio] ${emailSubject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center;">
              <h2 style="margin: 0; font-size: 24px;">New Contact Form Submission</h2>
              <p style="margin: 5px 0 0 0; opacity: 0.9;">From your portfolio website</p>
            </div>
            
            <div style="padding: 30px;">
              <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h3 style="margin: 0 0 15px 0; color: #333; font-size: 18px;">Contact Details</h3>
                <p style="margin: 8px 0;"><strong>Name:</strong> ${name.trim()}</p>
                <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${email.trim()}" style="color: #667eea;">${email.trim()}</a></p>
                <p style="margin: 8px 0;"><strong>Subject:</strong> ${emailSubject}</p>
              </div>
              
              <div style="margin: 20px 0;">
                <h3 style="color: #333; font-size: 18px; margin-bottom: 10px;">Message:</h3>
                <div style="background: white; padding: 20px; border-left: 4px solid #667eea; border-radius: 3px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                  ${message.trim().replace(/\n/g, '<br>')}
                </div>
              </div>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                <h4 style="color: #666; font-size: 14px; margin-bottom: 10px;">Technical Information</h4>
                <p style="font-size: 12px; color: #999; margin: 4px 0;">Submission ID: ${docRef.id}</p>
                <p style="font-size: 12px; color: #999; margin: 4px 0;">Timestamp: ${new Date().toISOString()}</p>
                <p style="font-size: 12px; color: #999; margin: 4px 0;">Source: ${req.get('Origin') || req.get('Referer') || 'Direct'}</p>
              </div>
            </div>
          </div>
        `,
        text: `
New contact form submission from your portfolio website:

Name: ${name.trim()}
Email: ${email.trim()}
Subject: ${emailSubject}

Message:
${message.trim()}

---
Technical Details:
Submission ID: ${docRef.id}
Timestamp: ${new Date().toISOString()}
Source: ${req.get('Origin') || req.get('Referer') || 'Direct'}
        `
      };

      // Send email
      await transporter.sendMail(mailOptions);

      // Update Firestore to mark as processed
      await admin.firestore().collection('contact_submissions').doc(docRef.id).update({
        processed: true,
        emailSent: true,
        processedAt: admin.firestore.FieldValue.serverTimestamp()
      });

      console.log(`Email sent successfully for submission: ${docRef.id}`);

      return res.status(200).json({
        success: true,
        message: 'Thank you for your message! I will get back to you soon.',
        submissionId: docRef.id
      });

    } catch (error) {
      console.error('Contact form error:', error);
      
      // Try to log error to Firestore if possible
      try {
        await admin.firestore().collection('contact_errors').add({
          error: error.message,
          stack: error.stack,
          timestamp: admin.firestore.FieldValue.serverTimestamp(),
          requestBody: req.body,
          ip: req.ip
        });
      } catch (logError) {
        console.error('Failed to log error to Firestore:', logError);
      }
      
      return res.status(500).json({
        success: false,
        message: 'Sorry, there was an error sending your message. Please try again later.'
      });
    }
  });
});