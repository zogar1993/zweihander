import {
	expect_character_to_be_unchanged,
	expect_character_to_have_attribute_set,
	the_saved_character_has,
	update_character
} from "@tests/api_tests/utils"
import { TEST_ANCESTRIES } from "../web_tests/character_sheet_reducer/utils/collections"

describe("set_value ancestry should", () => {
	it("change the ancestry trait of the character", async () => {
		the_saved_character_has({ ancestry: ANCESTRY.code })

		const result = await update_character(["set_value", PROPERTY, VALUE])

		expect(result.statusCode).toBe(200)
		expect_character_to_have_attribute_set({ ancestry_trait: VALUE })
	})

	it("accept null", async () => {
		the_saved_character_has({ ancestry: ANCESTRY.code })

		const result = await update_character(["set_value", PROPERTY, null])

		expect(result.statusCode).toBe(200)
		expect_character_to_have_attribute_set({ ancestry_trait: null })
	})

	it("not accept any value if ancestry is null", async () => {
		the_saved_character_has({ ancestry: null })

		const result = await update_character(["set_value", PROPERTY, VALUE])

		expect(result.statusCode).toBe(409)
		expect_character_to_be_unchanged()
	})

	it("not accept any value that is not a trait from the ancestry", async () => {
		the_saved_character_has({ ancestry: ANCESTRY.code })

		const result = await update_character([
			"set_value",
			PROPERTY,
			ANOTHER_ANCESTRY_VALUE
		])

		expect(result.statusCode).toBe(409)
		expect_character_to_be_unchanged()
	})

	it("accept only strings", async () => {
		const result = await update_character(["set_value", PROPERTY, 1])

		expect(result.statusCode).toBe(400)
		expect_character_to_be_unchanged()
	})
})

const ANCESTRY = TEST_ANCESTRIES[1]
const ANOTHER_ANCESTRY = TEST_ANCESTRIES[2]
const PROPERTY = "ancestry_trait"
const VALUE = ANCESTRY.traits[1].code
const ANOTHER_ANCESTRY_VALUE = ANOTHER_ANCESTRY.traits[1].code
