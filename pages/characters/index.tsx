import { withPageAuthRequired } from "@auth0/nextjs-auth0"
import { CharacterPreview } from "@core/actions/GetCharacters"
import CharactersScreen from "@web/components/character_sheet/CharactersScreen"
import useCollection from "@web/hooks/UseCollection"
import React from "react"

export default withPageAuthRequired(() => {
	const characters = useCollection<CharacterPreview>("characters")
	return <CharactersScreen characters={characters} />
})
