import getAncestries from "@core/actions/GetAncestries"
import getArchetypes from "@core/actions/GetArchetypes"
import getChaosAlignments from "@core/actions/GetChaosAlignments"
import getCharacterSheetOfId from "@core/actions/GetCharacterSheetOfId"
import getMagicSchools from "@core/actions/GetMagicSchools"
import getOrderAlignments from "@core/actions/GetOrderAlignments"
import getProfessions from "@core/actions/GetProfessions"
import getTalents from "@core/actions/GetTalents"
import {
	AncestryTech,
	MagicSchoolTech,
	ProfessionTech
} from "@core/domain/character_sheet/CharacterSheet"
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
	//TODO This is almost twice as good as not having it, but best way may be to
	// move collections to client fetch and send both calculated and non calculated
	// and may also make effects on demand. Nvm, it seems that the biggest culprit is Avatar.
	const ancestries: Array<AncestryTech> = (await getAncestries()).map(x => ({
		name: x.name,
		code: x.code,
		attribute_bonuses: x.attribute_bonuses,
		traits: x.traits.map(y => ({
			name: y.name,
			code: y.code,
			effect: y.effect,
			from: y.from,
			to: y.to
		}))
	}))
	const talents = (await getTalents()).map(x => ({
		name: x.name,
		code: x.code,
		effect: x.effect
	}))
	const professions: Array<ProfessionTech> = (await getProfessions()).map(
		x => ({
			name: x.name,
			code: x.code,
			advances: x.advances,
			traits: x.traits.map(y => ({
				name: y.name,
				code: y.code,
				effect: y.effect
			}))
		})
	)
	const schools: Array<MagicSchoolTech> = (await getMagicSchools()).map(x => ({
		name: x.name,
		code: x.code,
		source: x.source,
		spells: x.spells.map(y => ({
			name: y.name,
			code: y.code,
			effect: y.effect,
			principle: y.principle
		}))
	}))
	const archetypes = await getArchetypes()
	const orderAlignments = await getOrderAlignments()
	const chaosAlignments = await getChaosAlignments()
	const character = await getCharacterSheetOfId(characterId)
	return {
		props: {
			character,
			ancestries,
			talents,
			professions,
			schools,
			archetypes,
			orderAlignments,
			chaosAlignments
		}
	}
}
