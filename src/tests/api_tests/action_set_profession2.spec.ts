import {
	TEST_ARCHETYPES,
	TEST_PROFESSIONS
} from "../web_tests/character_sheet_reducer/utils/collections"
import {
	expect_character_to_be_unchanged,
	expect_character_to_have_attribute_set,
	the_saved_character_has,
	update_character
} from "./utils"

describe("set_value profession2 should", () => {
	it("change the second profession of the character", async () => {
		the_saved_character_has({
			archetype: ARCHETYPE.code,
			profession1: PROFESSION_1
		})
		const result = await update_character(["set_value", PROPERTY, VALUE])

		expect(result.statusCode).toBe(200)
		expect_character_to_have_attribute_set({ [PROPERTY]: VALUE })
	})

	it("accept null", async () => {
		the_saved_character_has({
			archetype: ARCHETYPE.code,
			profession1: PROFESSION_1
		})

		const result = await update_character(["set_value", PROPERTY, null])

		expect(result.statusCode).toBe(200)
		expect_character_to_have_attribute_set({ [PROPERTY]: null })
	})

	it("accept only predefined professions", async () => {
		the_saved_character_has({
			archetype: ARCHETYPE.code,
			profession1: PROFESSION_1
		})

		const result = await update_character(["set_value", PROPERTY, "whatever"])

		expect(result.statusCode).toBe(409)
		expect_character_to_be_unchanged()
	})

	it("fail when no first profession is set", async () => {
		the_saved_character_has({ archetype: ARCHETYPE.code })

		const result = await update_character(["set_value", PROPERTY, "whatever"])

		expect(result.statusCode).toBe(409)
		expect_character_to_be_unchanged()
	})
})

const PROPERTY = "profession2"
const ARCHETYPE = TEST_ARCHETYPES[1]
const PROFESSION_1 = ARCHETYPE.professions["Main Gauche"][1].profession
const VALUE = TEST_PROFESSIONS[2].code
