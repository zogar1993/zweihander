// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import getTalents from "../../lib/GetTalents"
import {Ancestry} from "../../src/Ancestry"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Ancestry>
) {
  const talents = await getTalents()
  res.status(200).json(talents)
}
