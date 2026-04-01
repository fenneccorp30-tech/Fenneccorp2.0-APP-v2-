import { Request, Response } from "express";
import { ContactMessage, NewsletterSubscription } from "../types.ts";

// In-memory storage (for demo purposes)
const messages: ContactMessage[] = [];
const subscriptions: NewsletterSubscription[] = [];

export const submitContactForm = (req: Request, res: Response) => {
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

    messages.push(newMessage);
    console.log("New contact message received:", newMessage);

    res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
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

    subscriptions.push(newSubscription);
    console.log("New newsletter subscription received:", newSubscription);

    res.status(201).json({ message: "Subscribed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error subscribing to newsletter" });
  }
};
