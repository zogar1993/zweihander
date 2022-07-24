import { ATTRIBUTE_DEFINITIONS } from "@core/domain/attribute/ATTRIBUTE_DEFINITIONS"
import { AttributeCode } from "@core/domain/attribute/AttributeCode"
import calculateProfessionProfile, {
	CalculateProfessionProfileProps,
	Expenditure,
	ProfessionProfile
} from "@core/domain/character_sheet/calculations/CalculateProfessionProfile"
import { ProfessionTech } from "@core/domain/character_sheet/CharacterSheet"
import { SanitizedCharacterSheet } from "@core/domain/character_sheet/sanitization/SanitizeCharacterSheet"
import { SKILL_DEFINITIONS } from "@core/domain/skill/SKILL_DEFINITIONS"
import { SkillCode } from "@core/domain/skill/SkillCode"
import { TEST_PROFESSIONS } from "@tests/web_tests/character_sheet/utils/collections"

describe("CalculateProfessionProfile should", () => {
	let professions: CalculateProfessionProfileProps["professions"] = []
	let character = createEmptyCharacterSheet()
	let profile: ProfessionProfile = {
		profession1: null,
		profession2: null,
		profession3: null,
		spending_outside_profession: [],
		missing_for_profession1: [],
		missing_for_profession2: []
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
		profile = calculateProfessionProfile({ character, professions })
	}

	function then_there_are_no_errors() {
		expect(profile.spending_outside_profession).toHaveLength(0)
		expect(profile.missing_for_profession1).toHaveLength(0)
		expect(profile.missing_for_profession2).toHaveLength(0)
	}

	function then_there_are_no_professions() {
		expect(profile.profession1).toBeNull()
		expect(profile.profession2).toBeNull()
		expect(profile.profession3).toBeNull()
	}

	function then_profession_1_is_set_without_spending() {
		const profession1 = createProfileForProfession(PROFESSION_1)
		expect(profile.profession1).toEqual(profession1)
		expect(profile.profession2).toBeNull()
		expect(profile.profession3).toBeNull()
	}

	function then_there_are_errors_for_spending_outside_profession(
		errors: Array<Expenditure>
	) {
		expect(profile.spending_outside_profession).toEqual(errors)
		expect(profile.missing_for_profession1).toHaveLength(0)
		expect(profile.missing_for_profession2).toHaveLength(0)
	}

	function then_profession_1_is_set_with_spending(
		spending: Array<Expenditure>
	) {
		expect(profile.profession1!.attributes.filter(x => x.checked)).toEqual(
			spending
				.filter(x => x.type === "attribute")
				.map(x => ({ code: x.code, checked: true }))
		)
		expect(profile.profession1!.skills.filter(x => x.checked)).toEqual(
			spending
				.filter(x => x.type === "skill")
				.map(x => ({ code: x.code, checked: true }))
		)
		expect(profile.profession1!.talents.filter(x => x.checked)).toEqual(
			spending
				.filter(x => x.type === "talent")
				.map(x => ({ code: x.code, checked: true }))
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
	{ type: "talent", code: "non_profession_talent" }
]

const PROFESSION_1_SPENDING = [
	{
		type: "attribute",
		code: Object.keys(PROFESSION_1.advances.bonus_advances)[1]
	},
	{ type: "skill", code: PROFESSION_1.advances.skill_ranks[1] },
	{ type: "talent", code: PROFESSION_1.advances.talents[1] }
]

function createProfileForProfession(profession: ProfessionTech) {
	return {
		profession: {
			name: profession.name,
			code: profession.code
		},
		attributes: Object.entries(profession.advances.bonus_advances).flatMap(
			([code, value]) =>
				Array.from(Array(value), () => ({ code, checked: false }))
		),
		skills: profession.advances.skill_ranks.map(skill => ({
			code: skill,
			checked: false
		})),
		talents: profession.advances.talents.map(talent => ({
			code: talent,
			checked: false
		}))
	}
}
