import { UpdateAction } from "@api/character/[id]/update"

export default async function updateCharacterOfId(
	id: string,
	changes: Array<UpdateAction>
) {
	await fetch(`/api/character/${id}/update`, {
		method: "POST",
		body: JSON.stringify(changes)
	})
}
