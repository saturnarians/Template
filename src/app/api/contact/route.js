import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

export async function POST(req) {
    try {
        const { name, email, subject, message } = await req.json();

        sgMail.setApiKey(process.env.SENDGRID_API_KEY);

        const msg = {
            to: process.env.CONTACT_EMAIL || 'your-email@church.com',
            from: process.env.SENDGRID_VERIFIED_SENDER,
            subject: `Contact Form: ${subject}`,
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
            html: `
                <h3>New Contact Form Submission</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `,
        };

        await sgMail.send(msg);

        return NextResponse.json(
            { message: 'Message sent successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error sending message:', error);
        return NextResponse.json(
            { error: 'Failed to send message' },
            { status: 500 }
        );
    }
}
