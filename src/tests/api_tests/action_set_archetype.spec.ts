import { TEST_ARCHETYPES } from "../web_tests/character_sheet_reducer/utils/collections"
import {
	expect_character_to_be_unchanged,
	expect_character_to_have_attribute_set,
	update_character
} from "./utils"

describe("set_value archetype should", () => {
	it("change the archetype of the character", async () => {
		const result = await update_character(["set_value", PROPERTY, VALUE])

		expect(result.statusCode).toBe(200)
		expect_character_to_have_attribute_set({ [PROPERTY]: VALUE })
	})

	it("accept null", async () => {
		const result = await update_character(["set_value", PROPERTY, null])

		expect(result.statusCode).toBe(200)
		expect_character_to_have_attribute_set({ [PROPERTY]: null })
	})

	it("accept only predefined archetypes", async () => {
		const result = await update_character(["set_value", PROPERTY, "whatever"])

		expect(result.statusCode).toBe(409)
		expect_character_to_be_unchanged()
	})
})

const PROPERTY = "archetype"
const VALUE = TEST_ARCHETYPES[1].code
