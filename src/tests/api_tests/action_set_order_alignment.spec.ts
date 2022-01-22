import {
	expect_character_to_be_unchanged,
	expect_character_to_have_attribute_set,
	update_character
} from "@tests/api_tests/utils"
import { TEST_ORDER_ALIGNMENTS } from "../web_tests/character_sheet_reducer/utils/collections"

describe("set_value order_alignment should", () => {
	it("change the order alignment of the character", async () => {
		const result = await update_character(["set_value", PROPERTY, VALUE])

		expect(result.statusCode).toBe(200)
		expect_character_to_have_attribute_set({ [PROPERTY]: VALUE })
	})

	it("accept null", async () => {
		const result = await update_character(["set_value", PROPERTY, null])

		expect(result.statusCode).toBe(200)
		expect_character_to_have_attribute_set({ [PROPERTY]: null })
	})

	it("accept only predefined order alignments", async () => {
		const result = await update_character(["set_value", PROPERTY, "whatever"])

		expect(result.statusCode).toBe(409)
		expect_character_to_be_unchanged()
	})
})

const PROPERTY = "order_alignment"
const VALUE = TEST_ORDER_ALIGNMENTS[1].code
