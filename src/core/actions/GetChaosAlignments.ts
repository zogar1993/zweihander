import getAlignments from "@core/actions/GetAlignments"

export default async function getChaosAlignments() {
	return (await getAlignments()).filter(x => x.type === "chaos")
}
