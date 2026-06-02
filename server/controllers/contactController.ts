import { Request, Response } from "express";
import { ContactMessage, NewsletterSubscription } from "../types.ts";
import { contactMessages, newsletterSubscriptions } from "../data.ts";
import nodemailer from "nodemailer";

// Email transporter configuration
let transporter: nodemailer.Transporter | null = null;

const getTransporter = () => {
  if (!transporter) {
    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS?.replace(/\s+/g, ""); // Remove spaces from App Password

    console.log("Initializing transporter with user:", user);
    
    transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // false for 587 (uses STARTTLS)
      auth: {
        user: user,
        pass: pass,
      },
      connectionTimeout: 10000 // 10 seconds timeout
    });
  }
  return transporter;
};

export const submitContactForm = async (req: Request, res: Response) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newMessage: ContactMessage = {
      name,
      email,
      message,
      createdAt: new Date().toISOString(),
    };

    contactMessages.push(newMessage);
    console.log("New contact message received:", newMessage);

    // Send email notification
    const recipientEmail = "fenneccorp3.0@gmail.com";
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: recipientEmail,
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
    };

    // Fire and forget email sending (do not block the request)
    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;

    if (user && pass) {
      console.log("Attempting to send email in background...");
      const mailTransporter = getTransporter();
      
      mailTransporter.sendMail(mailOptions)
        .then((info) => {
          console.log("Email sent successfully:", info.messageId);
        })
        .catch((mailError: any) => {
          console.error("DETAILED EMAIL ERROR (Background):", {
            message: mailError.message,
            code: mailError.code,
            command: mailError.command,
            response: mailError.response
          });
        });
    } else {
      console.warn("Email credentials missing in process.env");
      console.log(`[MOCK EMAIL] To: ${recipientEmail}, Subject: ${mailOptions.subject}`);
    }

    // Always respond immediately so the UI doesn't hang
    res.status(201).json({ message: "Message saved and email sending initiated" });
  } catch (error) {
    console.error("Error in submitContactForm:", error);
    res.status(500).json({ message: "Error submitting contact form" });
  }
};

export const subscribeNewsletter = (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const newSubscription: NewsletterSubscription = {
      email,
      subscribedAt: new Date().toISOString(),
    };

    newsletterSubscriptions.push(newSubscription);
    console.log("New newsletter subscription received:", newSubscription);

    res.status(201).json({ message: "Subscribed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error subscribing to newsletter" });
  }
};
