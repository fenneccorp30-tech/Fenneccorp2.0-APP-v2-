import { Request, Response } from "express";
import { appContent } from "../data.ts";

export const getHeroContent = (req: Request, res: Response) => {
  res.json(appContent.hero);
};

export const getAboutContent = (req: Request, res: Response) => {
  res.json(appContent.about);
};

export const getAllContent = (req: Request, res: Response) => {
  res.json(appContent);
};
