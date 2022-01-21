import getAlignments from "@core/actions/GetAlignments"
import getAncestries from "@core/actions/GetAncestries"
import getArchetypes from "@core/actions/GetArchetypes"
import getCharacterSheetOfId from "@core/actions/GetCharacterSheetOfId"
import getMagicSchools from "@core/actions/GetMagicSchools"
import getProfessions from "@core/actions/GetProfessions"
import getTalents from "@core/actions/GetTalents"
import CharacterSheetScreen, {
	CharacterSheetScreenProps
} from "@web/components/character_sheet/CharacterSheetScreen"
import React from "react"

export default function CharacterScreen(props: CharacterSheetScreenProps) {
	return <CharacterSheetScreen {...props} />
}

export async function getServerSideProps({
	params: { character: characterId }
}: any) {
	const ancestries = await getAncestries()
	const talents = await getTalents()
	const professions = await getProfessions()
	const schools = await getMagicSchools()
	const archetypes = await getArchetypes()
	const alignments = await getAlignments()
	const character = await getCharacterSheetOfId(characterId)
	return {
		props: {
			character,
			ancestries,
			talents,
			professions,
			schools,
			archetypes,
			orderAlignments: alignments.filter(x => x.type === "order"),
			chaosAlignments: alignments.filter(x => x.type === "chaos")
		}
	}
}
