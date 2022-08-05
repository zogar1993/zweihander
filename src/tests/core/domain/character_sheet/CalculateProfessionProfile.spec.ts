import { ATTRIBUTE_DEFINITIONS } from "@core/domain/attribute/ATTRIBUTE_DEFINITIONS"
import { AttributeCode } from "@core/domain/attribute/AttributeCode"
import calculateProfessionProfile, {
	CalculateProfessionProfileProps, CharacterSheetProfessionAdvances,
	Expenditure,
	ProfessionProfile
} from "@core/domain/character_sheet/calculations/CalculateProfessionProfile"
import { ProfessionTech } from "@core/domain/character_sheet/CharacterSheet"
import { SanitizedCharacterSheet } from "@core/domain/character_sheet/sanitization/SanitizeCharacterSheet"
import { getByCode } from "@core/domain/general/GetByCode"
import { Item } from "@core/domain/types/Item"
import { SKILL_DEFINITIONS } from "@core/domain/skill/SKILL_DEFINITIONS"
import { SkillCode } from "@core/domain/skill/SkillCode"
import { TEST_PROFESSIONS, TEST_TALENTS } from "@tests/web_tests/character_sheet/utils/collections"

const BLANK_CHARACTER_TIER_ITEM = Object.freeze({ name: "", code: "", checked: false })

const BLANK_TIER: CharacterSheetProfessionAdvances = {
	attributes: Array.from(Array(7), () => BLANK_CHARACTER_TIER_ITEM),
	skills: Array.from(Array(10), () => BLANK_CHARACTER_TIER_ITEM),
	talents: Array.from(Array(3), () => BLANK_CHARACTER_TIER_ITEM),
	wildcard_talents: []
}

describe("CalculateProfessionProfile should", () => {
	let professions: CalculateProfessionProfileProps["professions"] = []
	let character = createEmptyCharacterSheet()
	let profile: ProfessionProfile = {
		professions: [BLANK_TIER, BLANK_TIER, BLANK_TIER],
		spending_outside_profession: BLANK_TIER
	}

	beforeEach(() => {
		character = createEmptyCharacterSheet()
	})

	describe("while having no professions", () => {
		beforeEach(() => {
			professions = []
		})

		it("be ok if character has no spending", async () => {
			given_character_sheet_has_no_spending()

			when_profession_profile_is_calculated()

			then_there_are_no_errors()
			then_there_are_no_professions()
		})

		it("have spending outside of profession if it has any spending", async () => {
			given_character_sheet_has_spending(ILLEGAL_SPENDING)

			when_profession_profile_is_calculated()

			then_there_are_errors_for_spending_outside_profession(ILLEGAL_SPENDING)
			then_there_are_no_professions()
		})
	})

	describe("while having first profession", () => {
		beforeEach(() => {
			professions = [PROFESSION_1]
		})

		it("be ok if character has no spending", async () => {
			given_character_sheet_has_no_spending()

			when_profession_profile_is_calculated()

			then_there_are_no_errors()
			then_profession_1_is_set_without_spending()
		})

		it("be ok if character has profession spending", async () => {
			given_character_sheet_has_spending(PROFESSION_1_SPENDING)

			when_profession_profile_is_calculated()

			then_there_are_no_errors()
			then_profession_1_is_set_with_spending(PROFESSION_1_SPENDING)
		})
	})

	function given_character_sheet_has_no_spending() {
		character = createEmptyCharacterSheet()
	}

	function given_character_sheet_has_spending(spending: Array<Expenditure>) {
		character = createEmptyCharacterSheet()
		spending.forEach(x => {
			switch (x.type) {
				case "attribute":
					character.attributes[x.code as AttributeCode].advances++
					break
				case "skill":
					character.skills[x.code as SkillCode].ranks++
					break
				case "talent":
					character.talents.push(x.code)
					break
				default:
					throw Error(`"${x.type}" is not a valid type`)
			}
		})
	}

	function when_profession_profile_is_calculated() {
		profile = calculateProfessionProfile({ character, professions, talents: TEST_TALENTS })
	}

	function then_there_are_no_errors() {
		expect(profile.spending_outside_profession.attributes).toHaveLength(0)
		expect(profile.spending_outside_profession.skills).toHaveLength(0)
		expect(profile.spending_outside_profession.talents).toHaveLength(0)
	}

	function then_there_are_no_professions() {
		expect(profile.professions[0]).toEqual(BLANK_TIER)
		expect(profile.professions[1]).toEqual(BLANK_TIER)
		expect(profile.professions[2]).toEqual(BLANK_TIER)
	}

	function then_profession_1_is_set_without_spending() {
		const profession1 = getProfessionTierTemplate(PROFESSION_1)
		expect(profile.professions[0]).toEqual(profession1)
		expect(profile.professions[1]).toEqual(BLANK_TIER)
		expect(profile.professions[2]).toEqual(BLANK_TIER)
	}

	function then_there_are_errors_for_spending_outside_profession(
		errors: Array<Expenditure>
	) {

		expect(profile.spending_outside_profession).toEqual({
			attributes: errors
				.filter(x => x.type === "attribute")
				.map(x => ({ code: x.code, checked: false, name: getByCode(x.code, ATTRIBUTE_DEFINITIONS).name })),
			skills: errors
				.filter(x => x.type === "skill")
				.map(x => ({ code: x.code, checked: false, name: getByCode(x.code, SKILL_DEFINITIONS).name })),
			talents: errors
				.filter(x => x.type === "talent")
				.map(x => ({ code: x.code, checked: false, name: getByCode(x.code, TEST_TALENTS).name }))
		})
	}

	function then_profession_1_is_set_with_spending(
		spending: Array<Expenditure>
	) {
		expect(profile.professions[0]!.attributes.filter(x => x.checked)).toEqual(
			spending
				.filter(x => x.type === "attribute")
				.map(x => ({ code: x.code, checked: true, name: getByCode(x.code, ATTRIBUTE_DEFINITIONS).name }))
		)
		expect(profile.professions[0]!.skills.filter(x => x.checked)).toEqual(
			spending
				.filter(x => x.type === "skill")
				.map(x => ({ code: x.code, checked: true, name: getByCode(x.code, SKILL_DEFINITIONS).name }))
		)
		expect(profile.professions[0]!.talents.filter(x => x.checked)).toEqual(
			spending
				.filter(x => x.type === "talent")
				.map(x => ({ code: x.code, checked: true, name: getByCode(x.code, TEST_TALENTS).name }))
		)
	}
})

const PROFESSION_1 = TEST_PROFESSIONS[1]
const PROFESSION_2 = TEST_PROFESSIONS[2]
const PROFESSION_3 = TEST_PROFESSIONS[3]

function createEmptyCharacterSheet(): {
	attributes: Record<AttributeCode, { advances: number }>
	skills: SanitizedCharacterSheet["skills"]
	talents: SanitizedCharacterSheet["talents"]
} {
	return {
		attributes: (() => {
			const result = {} as any
			ATTRIBUTE_DEFINITIONS.forEach(
				skill => (result[skill.code] = { advances: 0 })
			)
			return result
		})(),
		skills: (() => {
			const result = {} as any
			SKILL_DEFINITIONS.forEach(skill => (result[skill.code] = { ranks: 0 }))
			return result
		})(),
		talents: []
	}
}

const ILLEGAL_SPENDING = [
	{ type: "attribute", code: "fellowship" },
	{ type: "skill", code: "gamble" },
	{ type: "talent", code: TEST_TALENTS[TEST_TALENTS.length - 1].code }
]

const PROFESSION_1_SPENDING = [
	{
		type: "attribute",
		code: Object.keys(PROFESSION_1.advances.bonus_advances)[1]
	},
	{ type: "skill", code: PROFESSION_1.advances.skill_ranks[1] },
	{ type: "talent", code: PROFESSION_1.advances.talents[1] }
]

const toItem = (item: Item) => ({ name: item.name, code: item.code, checked: false })

function getProfessionTierTemplate(profession: ProfessionTech): CharacterSheetProfessionAdvances {
	return {
		attributes: Object.entries(profession.advances.bonus_advances).flatMap(([code, value]) =>
			Array.from(Array(value), () => getByCode(code, ATTRIBUTE_DEFINITIONS))
		).map(toItem),
		skills: profession.advances.skill_ranks.map(code => getByCode(code, SKILL_DEFINITIONS)).map(toItem),
		talents: profession.advances.talents.map(code => getByCode(code, TEST_TALENTS)).map(toItem),
		wildcard_talents: []
	}
}