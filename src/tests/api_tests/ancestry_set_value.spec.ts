import {
	expect_character_to_be_unchanged,
	expect_character_to_have_attribute_set,
	update_character
} from "@tests/api_tests/utils"
import { TEST_ANCESTRIES } from "../web_tests/character_sheet/utils/collections"

describe("set_value ancestry should", () => {
	it("change the ancestry of the character", async () => {
		const result = await update_character(["set_value", PROPERTY, VALUE])

		expect(result.statusCode).toBe(200)
		expect_character_to_have_attribute_set({ ancestry: VALUE })
	})

	it("accept only predefined ancestries", async () => {
		const result = await update_character(["set_value", PROPERTY, "whatever"])

		expect(result.statusCode).toBe(409)
		expect_character_to_be_unchanged()
	})

	it("accept null", async () => {
		const result = await update_character(["set_value", PROPERTY, null])

		expect(result.statusCode).toBe(200)
		expect_character_to_have_attribute_set({ ancestry: null })
	})

	it("accept only strings", async () => {
		const result = await update_character(["set_value", PROPERTY, 1])

		expect(result.statusCode).toBe(400)
		expect_character_to_be_unchanged()
	})
})

const PROPERTY = "ancestry"
const VALUE = TEST_ANCESTRIES[1].code
