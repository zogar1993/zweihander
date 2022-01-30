import { UpdateAction } from "@api/characters/[id]/update"

export default async function updateCharacterOfId(
	id: string,
	changes: Array<UpdateAction>
) {
	await fetch(`/api/characters/${id}/update`, {
		method: "POST",
		body: JSON.stringify(changes)
	})
}
