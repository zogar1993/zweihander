export default async function deleteCharacterOfId(id: string) {
	await fetch(`/api/characters/${id}`, { method: "DELETE" })
}
