import { getCharacterSheetOfId } from "@core/actions/GetCharacterSheetOfId"
import React from "react"

export default function CharactersScreen({
	character
}: {
	character: { name: string }
}) {
	return <span>{character.name}</span>
}

export async function getServerSideProps({ params: { character: id } }: any) {
	const character = await getCharacterSheetOfId(id)
	return {
		props: {
			character
		}
	}
}
