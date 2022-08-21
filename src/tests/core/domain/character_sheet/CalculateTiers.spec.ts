import { ATTRIBUTE_DEFINITIONS } from "@core/domain/attribute/ATTRIBUTE_DEFINITIONS"
import { AttributeCode } from "@core/domain/attribute/AttributeCode"
import calculateTiers, { CalculateProfessionProfileProps, } from "@core/domain/character_sheet/calculations/CalculateTiers"
import { ProfessionTech } from "@core/domain/character_sheet/CharacterSheet"
import { SanitizedCharacterSheet } from "@core/domain/character_sheet/sanitization/SanitizeCharacterSheet"
import { SKILL_DEFINITIONS } from "@core/domain/skill/SKILL_DEFINITIONS"
import { SkillCode } from "@core/domain/skill/SkillCode"
import { TEST_PROFESSIONS, TEST_TALENTS } from "@tests/web_tests/character_sheet/utils/collections"

const BLANK_TIER: ReturnType<typeof calculateTiers>["tiers"][0] = {
	attributes: { missing: [], bought: [] },
	skills: { missing: [], bought: [] },
	talents: { missing: [], bought: [] },
	wildcards: []
}

const BLANK_REMAINING_EXPENDITURES: ReturnType<typeof calculateTiers>["remaining"] = {
	attributes: [],
	skills: [],
	talents: []
}

describe("CalculateProfessionProfile should", () => {
	let professions: CalculateProfessionProfileProps["professions"] = []
	let character = createEmptyCharacterSheet()
	let tiers: ReturnType<typeof calculateTiers> = {
		tiers: [BLANK_TIER, BLANK_TIER, BLANK_TIER],
		remaining: BLANK_REMAINING_EXPENDITURES
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

	function given_character_sheet_has_spending(spending: Spending) {
		character = createEmptyCharacterSheet()
		spending.attributes.forEach(x => {
			character.attributes[x as AttributeCode].advances++
		})
		spending.skills.forEach(x => {
			character.skills[x as SkillCode].ranks++
		})
		spending.talents.forEach(x => {
			character.talents.push(x)
		})
	}

	function when_profession_profile_is_calculated() {
		tiers = calculateTiers({ character, professions })
	}

	function then_there_are_no_errors() {
		expect(tiers.remaining.attributes).toHaveLength(0)
		expect(tiers.remaining.skills).toHaveLength(0)
		expect(tiers.remaining.talents).toHaveLength(0)
	}

	function then_there_are_no_professions() {
		expect(tiers.tiers).toHaveLength(0)
	}

	function then_profession_1_is_set_without_spending() {
		const profession1 = getProfessionTierTemplate(PROFESSION_1)
		expect(tiers.tiers).toEqual([profession1])
	}

	function then_there_are_errors_for_spending_outside_profession(
		errors: Record<"attributes" | "skills" | "talents", ReadonlyArray<string>>
	) {
		expect(tiers.remaining).toEqual(errors)
	}

	function then_profession_1_is_set_with_spending(spending: Spending) {
		expect(tiers.tiers[0]!.attributes.bought).toEqual(spending.attributes)
		expect(tiers.tiers[0]!.skills.bought).toEqual(spending.skills)
		expect(tiers.tiers[0]!.talents.bought).toEqual(spending.talents)
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

const ILLEGAL_SPENDING = {
	"attributes": ["fellowship"],
	"skills": ["gamble"],
	"talents": [TEST_TALENTS[TEST_TALENTS.length - 1].code]
}

const PROFESSION_1_SPENDING = {
	"attributes": [Object.keys(PROFESSION_1.advances.bonus_advances)[1]],
	"skills": [PROFESSION_1.advances.skill_ranks[1]],
	"talents": [PROFESSION_1.advances.talents[1]]
}

function getProfessionTierTemplate(profession: ProfessionTech) {
	const attributes = Object.entries(profession.advances.bonus_advances).flatMap(
		([code, value]) => Array.from(Array(value), () => code))
	const skills = profession.advances.skill_ranks
	const talents = profession.advances.talents
	return {
		attributes: { bought: [], missing: attributes },
		skills: { bought: [], missing: skills },
		talents: { bought: [], missing: talents },
		wildcards: []
	}
}

type Spending = {
	attributes: ReadonlyArray<string>
	skills: ReadonlyArray<string>
	talents: ReadonlyArray<string>
}

 