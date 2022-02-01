export default async function createCharacter() {
	const result = await fetch(`/api/characters`, { method: "POST" })
	return await result.json()
}
