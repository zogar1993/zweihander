import {
	classifyExpendituresReducer,
	DEFAULT_ACCUMULATOR,
	removeRepeatedReducer
} from "@core/domain/character_sheet/calculations/tiers/reducers"
import { ProfessionTech } from "@core/domain/character_sheet/CharacterSheet"

export default function calculateTierTalents({ character, professions }: {
	character: CharacterSheet, professions: ReadonlyArray<Profession>
}) {
	return professions
		.map(getProfessionTalents)
		.reduce(removeRepeatedReducer, [])
		.reduce(classifyExpendituresReducer, {
			...DEFAULT_ACCUMULATOR,
			expenditures: getTalentExpenditures(character) as ReadonlyArray<string>
		})
}

const getTalentExpenditures = (character: CharacterSheet) => [...character.talents]

const getProfessionTalents = (profession: Profession) =>
	profession.advances.talents.map(code => code)

type Profession = { advances: Pick<ProfessionTech["advances"], "talents"> }
type CharacterSheet = { talents: ReadonlyArray<string> }