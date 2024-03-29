import getSubmenus from "@core/actions/GetSubmenus"
import { LeafItem } from "@web/components/app/Menu"
import { NextApiRequest, NextApiResponse } from "next"

export default async function GetSubmenusApi(
	req: NextApiRequest,
	res: NextApiResponse<{
		ancestries: ReadonlyArray<LeafItem>
		magicSources: ReadonlyArray<LeafItem>
	}>
) {
	const submenus = await getSubmenus()
	res.status(200).json(submenus)
}
