import { AttributeCode } from "@core/domain/attribute/AttributeCode"
import {
	classifyExpendituresReducer,
	DEFAULT_ACCUMULATOR
} from "@core/domain/character_sheet/calculations/tiers/reducers"
import { ProfessionTech } from "@core/domain/character_sheet/CharacterSheet"

export default function calculateTierAttributes({ character, professions }: {
	character: CharacterSheet, professions: ReadonlyArray<Profession>
}) {
	return professions
		.map(getProfessionAttributes)
		.reduce(classifyExpendituresReducer, {
			...DEFAULT_ACCUMULATOR,
			expenditures: getAttributeExpenditures(character)
		})
}

const getAttributeExpenditures = (character: CharacterSheet) =>
	Object.entries(character.attributes).flatMap(([code, value]) =>
		Array.from(Array(value.advances), () => code)) as ReadonlyArray<string>

const getProfessionAttributes = (profession: Profession) =>
	Object.entries(profession.advances.bonus_advances).flatMap(
		([code, value]) => Array.from(Array(value), () => code))

type Profession = { advances: Pick<ProfessionTech["advances"], "bonus_advances"> }
type CharacterSheet = { attributes: Record<AttributeCode, { advances: number }> }