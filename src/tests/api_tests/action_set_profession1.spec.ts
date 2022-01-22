import { TEST_ARCHETYPES } from "../web_tests/character_sheet_reducer/utils/collections"
import {
	expect_character_to_be_unchanged,
	expect_character_to_have_attribute_set,
	the_saved_character_has,
	update_character
} from "./utils"

describe("set_value profession1 should", () => {
	it("change the first profession of the character", async () => {
		the_saved_character_has({ archetype: ARCHETYPE.code })

		const result = await update_character(["set_value", PROPERTY, VALUE])

		expect(result.statusCode).toBe(200)
		expect_character_to_have_attribute_set({ [PROPERTY]: VALUE })
	})

	it("accept null", async () => {
		the_saved_character_has({ archetype: ARCHETYPE.code })

		const result = await update_character(["set_value", PROPERTY, null])

		expect(result.statusCode).toBe(200)
		expect_character_to_have_attribute_set({ [PROPERTY]: null })
	})

	it("not accept a profession not contained in the archetype", async () => {
		the_saved_character_has({ archetype: ARCHETYPE.code })

		const result = await update_character([
			"set_value",
			PROPERTY,
			PROFESSION_FROM_ANOTHER_ARCHETYPE
		])

		expect(result.statusCode).toBe(409)
		expect_character_to_be_unchanged()
	})
})

const PROPERTY = "profession1"
const ARCHETYPE = TEST_ARCHETYPES[1]
const ANOTHER_ARCHETYPE = TEST_ARCHETYPES[2]
const VALUE = ARCHETYPE.professions["Main Gauche"][1].profession
const PROFESSION_FROM_ANOTHER_ARCHETYPE =
	ANOTHER_ARCHETYPE.professions["Main Gauche"][1].profession
