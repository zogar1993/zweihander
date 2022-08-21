import { UpdateAction } from "@api/characters/[id]/update"

export default async function updateCharacterOfId(
	id: string,
	last_modified: string,
	changes: ReadonlyArray<UpdateAction>
) {
	const response = await fetch(`/api/characters/${id}/update`, {
		method: "POST",
		body: JSON.stringify(changes),
		headers: { "if-unmodified-since": last_modified }
	})
	if (response.status !== 204) throw Error(await response.json())
	return response.headers.get("last-modified")!
}
