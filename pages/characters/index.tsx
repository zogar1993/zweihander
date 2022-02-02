import { withPageAuthRequired } from "@auth0/nextjs-auth0"
import { getCharacters } from "@core/actions/GetCharacters"
import CharactersScreen from "@web/components/character_sheet/CharactersScreen"
import RedirectLoaderCharacterScreen from "@web/components/redirect_loaders/RedirectLoaderCharacterScreen"
import React from "react"

export default function CharactersPage({ characters }: any) {
//TODO move to CSR
	return (
		<RedirectLoaderCharacterScreen>
			<CharactersScreen characters={characters} />
		</RedirectLoaderCharacterScreen>
	)
}

export const getServerSideProps = withPageAuthRequired({
	getServerSideProps: async () => {
		const characters = await getCharacters()
		return { props: { characters } }
	}
})
