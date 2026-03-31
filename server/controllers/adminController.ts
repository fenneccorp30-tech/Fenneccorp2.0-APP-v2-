import { Request, Response } from "express";
import { contactMessages, newsletterSubscriptions } from "../data";

export const getDashboardData = (req: Request, res: Response) => {
  res.json({
    messages: contactMessages,
    subscribers: newsletterSubscriptions,
    stats: {
      totalMessages: contactMessages.length,
      totalSubscribers: newsletterSubscriptions.length
    }
  });
};
