import { Request, Response } from "express";
import { Controller } from "../../types/index.types";
import { CSVParser, TargetEmailForCSV } from "../../utils/csv.utils";
import { logger } from "../../utils/logger.utils";
import { SendMail } from "../../utils/mail.util";
import { prisma } from "../../utils/prisma.utils";

const GetBuilderResidencyCSV = async (
  _req: Request,
  res: Response
): Controller => {
  const email = TargetEmailForCSV;
  const scope = "Builder Residency";

  try {
    const query = await prisma.builder.findMany();

    if (!query?.length) {
      return res.send(`No entry has been submitted for ${scope} yet!`);
    }

    if (query?.length) {
      const csv = await CSVParser(query);

      const response = await SendMail({
        subject: `${scope} Submissions - From ETH Enugu`,
        text: `Hello,\nHere is your requested attatchment`,
        to: email,
        attachments: [
          {
            filename: `${scope} - ETH Enugu ${new Date().toLocaleTimeString()}.csv`,
            content: csv,
          },
        ],
      });

      if (response) {
        return res.send(`${scope} applications have been sent to ${email}`);
      }
    }
  } catch (error) {
    logger.error(`Failed to send ${scope} CSV:`, error);

    res.status(500).json({
      success: false,
      message: `Failed to send ${scope} CSV to ${email} `,
      error,
    });
  }
};

export default GetBuilderResidencyCSV;
