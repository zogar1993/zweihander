import type { NextApiRequest, NextApiResponse } from 'next'
import getTalents from "../../../lib/GetTalents"
import {importify} from "../../../lib/utils/ContentfulUtils"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const talents = await getTalents()
  res.status(200).json(importify(talents, "talent"))
}
