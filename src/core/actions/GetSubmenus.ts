import getAncestries from "@core/actions/GetAncestries"
import getMagicSources from "@core/actions/GetMagicSources"
import { LeafItem } from "@web/components/app/Menu"

export default async function getSubmenus() {
	const ancestries: Array<LeafItem> = (await getAncestries()).map(x => ({
		name: x.name,
		icon: x.icon,
		path: `ancestries/${x.code}`
	}))
	const magicSources: Array<LeafItem> = (await getMagicSources()).map(x => ({
		name: x.name,
		icon: x.icon,
		path: `magic/${x.code}${
			x.schools.length > 1 ? `/${x.schools[0].code}` : ""
		}`
	}))
	return { ancestries, magicSources }
}
