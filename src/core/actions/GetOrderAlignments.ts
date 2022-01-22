import getAlignments from "@core/actions/GetAlignments"

export default async function getOrderAlignments() {
	return (await getAlignments()).filter(x => x.type === "order")
}
