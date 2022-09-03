import { UpdateAction } from "@api/characters/[id]/update"

export default async function updateCharacterOfId({
																										id,
																										lastModified,
																										changes
																									}: {
																										id: string,
																										lastModified: string,
																										changes: ReadonlyArray<UpdateAction>
																									}
) {
	//throw (Error("test error"))
	const response = await fetch(`/api/characters/${id}/update`, {
		method: "POST",
		body: JSON.stringify(changes),
		headers: { "if-unmodified-since": lastModified }
	})
	if (response.status !== 204) throw Error(await response.json())
	return response.headers.get("last-modified")!
}
