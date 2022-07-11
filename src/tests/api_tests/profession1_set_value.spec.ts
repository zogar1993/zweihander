import {
	expect_character_to_be_unchanged,
	expect_character_to_have_attribute_set,
	expect_character_to_have_changed,
	the_saved_character_has,
	update_character
} from "@tests/api_tests/utils"
import { TEST_ARCHETYPES } from "@tests/web_tests/character_sheet/utils/collections"

describe("set_value profession1 should", () => {
	it("change the first profession of the character", async () => {
		the_saved_character_has({ archetype: ARCHETYPE.code })

		const result = await update_character(["set_value", PROPERTY, VALUE])

		expect(result).toHaveStatusCode(204)
		expect_character_to_have_attribute_set({ [PROPERTY]: VALUE })
	})

	it("accept null", async () => {
		the_saved_character_has({ archetype: ARCHETYPE.code })

		const result = await update_character(["set_value", PROPERTY, null])

		expect(result).toHaveStatusCode(204)
		expect_character_to_have_attribute_set({ [PROPERTY]: null })
	})

	it("not accept a profession not contained in the archetype", async () => {
		the_saved_character_has({ archetype: ARCHETYPE.code })

		const result = await update_character([
			"set_value",
			PROPERTY,
			PROFESSION_FROM_ANOTHER_ARCHETYPE
		])

		expect(result).toHaveStatusCode(409)
		expect_character_to_be_unchanged()
	})

	it("may be sent alongside its archetype", async () => {
		const result = await update_character(
			["set_value", PROPERTY, VALUE],
			["set_value", "archetype", ARCHETYPE.code]
		)

		expect(result).toHaveStatusCode(204)
		expect_character_to_have_changed({
			set: { [PROPERTY]: VALUE, archetype: ARCHETYPE.code }
		})
	})

	it("accept only strings", async () => {
		const result = await update_character(["set_value", PROPERTY, 1])

		expect(result).toHaveStatusCode(400)
		expect_character_to_be_unchanged()
	})
})

const PROPERTY = "profession1"
const ARCHETYPE = TEST_ARCHETYPES[1]
const ANOTHER_ARCHETYPE = TEST_ARCHETYPES[2]
const VALUE = ARCHETYPE.professions["Main Gauche"][1].profession
const PROFESSION_FROM_ANOTHER_ARCHETYPE =
	ANOTHER_ARCHETYPE.professions["Main Gauche"][1].profession
