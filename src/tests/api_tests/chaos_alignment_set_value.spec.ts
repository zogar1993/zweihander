import {
	expect_character_to_be_unchanged,
	expect_character_to_have_attribute_set,
	update_character
} from "@tests/api_tests/utils"
import { TEST_CHAOS_ALIGNMENTS } from "@tests/web_tests/character_sheet/utils/collections"

describe("set_value chaos_alignment should", () => {
	it("change the chaos alignment of the character", async () => {
		const result = await update_character(["set_value", PROPERTY, VALUE])

		expect(result).toHaveStatusCode(204)
		expect_character_to_have_attribute_set({ [PROPERTY]: VALUE })
	})

	it("accept null", async () => {
		const result = await update_character(["set_value", PROPERTY, null])

		expect(result).toHaveStatusCode(204)
		expect_character_to_have_attribute_set({ [PROPERTY]: null })
	})

	it("accept only predefined archetypes", async () => {
		const result = await update_character(["set_value", PROPERTY, "whatever"])

		expect(result).toHaveStatusCode(409)
		expect_character_to_be_unchanged()
	})

	it("accept only strings", async () => {
		const result = await update_character(["set_value", PROPERTY, 1])

		expect(result).toHaveStatusCode(400)
		expect_character_to_be_unchanged()
	})
})

const PROPERTY = "chaos_alignment"
const VALUE = TEST_CHAOS_ALIGNMENTS[1].code
