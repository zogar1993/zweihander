import { getCharacters } from "@core/actions/GetCharacters"
import CharactersScreen, {
	CharactersScreenProps
} from "@web/components/character_sheet/CharactersScreen"
import RedirectLoaderCharacterScreen from "@web/components/redirect_loaders/RedirectLoaderCharacterScreen"
import React from "react"

export default function CharactersPage({ characters }: CharactersScreenProps) {
	return (
		<RedirectLoaderCharacterScreen>
			<CharactersScreen characters={characters} />
		</RedirectLoaderCharacterScreen>
	)
}

export async function getServerSideProps() {
	const characters = await getCharacters()
	return {
		props: {
			characters
		}
	}
}
