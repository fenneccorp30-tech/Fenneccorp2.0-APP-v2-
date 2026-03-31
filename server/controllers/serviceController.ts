import { Request, Response } from "express";
import { services } from "../data";

export const getServices = (req: Request, res: Response) => {
  try {
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: "Error fetching services" });
  }
};

export const getServiceById = (req: Request, res: Response) => {
  try {
    const service = services.find((s) => s.id === req.params.id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: "Error fetching service" });
  }
};
