import type { NextApiRequest, NextApiResponse } from "next";
import { getAncestries } from "../../../lib/GetAncestries";
import { importify } from "../../../lib/utils/ContentfulUtils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const ancestries = await getAncestries();
  res.status(200).json(importify(ancestries, "ancestry"));
}
