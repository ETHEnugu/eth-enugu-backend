import { NextFunction, Request, RequestHandler, Response } from "express";
import path from "path";
import sharp from "sharp";
import TextToSVG from "text-to-svg";
import { badRequestError } from "../../middlewares/error-handler.middleware";
import fs from "fs";

const textToSVG = TextToSVG
   .loadSync
   // path.join(__dirname, "fonts", "OpenSans-Bold.ttf")
   ();

const TEMPLATE_PATH = path.join(__dirname, "../../../asset", "dp_template.png");

export const createDP = (async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   const name = " ";
   const avatarSize = 250;
   const avatarPath = req.file?.path;

   try {
      // const { name } = req.body;
      // const avatarPath = path.join(__dirname, "../../../asset", "avatar.jpg");

      if (!avatarPath) {
         throw badRequestError("No avatar was found!");
      }

      const circleSvg = Buffer.from(
         `<svg width="${avatarSize}" height="${avatarSize}">
        <circle cx="${avatarSize / 2}" cy="${avatarSize / 2}" r="${
            avatarSize / 2
         }" fill="white" />
        </svg>`
      );

      // Resize avatar
      const resizedAvatar = await sharp(avatarPath)
         .resize(avatarSize, avatarSize)
         .composite([{ input: circleSvg, blend: "dest-in" }])
         .png()
         .toBuffer();

      // Render text as SVG
      const svgText = textToSVG.getSVG(name, {
         x: 0,
         y: 0,
         fontSize: 48,
         anchor: "top",
         attributes: { fill: "#006C00", stroke: "white" },
      });

      // Convert SVG to Buffer
      const svgBuffer = Buffer.from(svgText);

      // Composite everything
      const result = await sharp(TEMPLATE_PATH)
         .composite([
            { input: resizedAvatar, top: 338, left: 418 },
            { input: svgBuffer, top: 580, left: 400 },
         ])
         .png()
         .toBuffer();

      res.type("image/png").send(result);
   } catch (error) {
      next(error);
   } finally {
      if (avatarPath) {
         fs.unlink(avatarPath, () => {}); // Clean up uploaded file
      }
   }
}) as RequestHandler;
