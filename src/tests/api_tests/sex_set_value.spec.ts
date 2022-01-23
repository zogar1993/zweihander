import {
	expect_character_to_be_unchanged,
	expect_character_to_have_attribute_set,
	update_character
} from "@tests/api_tests/utils"
import { SEXES } from "@web/components/character_sheet/bio/Constants"

describe("set_value sex should", () => {
	it("change the sex of the character", async () => {
		const result = await update_character(["set_value", PROPERTY, VALUE])

		expect(result.statusCode).toBe(200)
		expect_character_to_have_attribute_set({ [PROPERTY]: VALUE })
	})

	it("accept null", async () => {
		const result = await update_character(["set_value", PROPERTY, null])

		expect(result.statusCode).toBe(200)
		expect_character_to_have_attribute_set({ [PROPERTY]: null })
	})

	it("accept only predefined sexes", async () => {
		const result = await update_character(["set_value", PROPERTY, "whatever"])

		expect(result.statusCode).toBe(409)
		expect_character_to_be_unchanged()
	})

	it("accept only strings", async () => {
		const result = await update_character(["set_value", PROPERTY, 1])

		expect(result.statusCode).toBe(400)
		expect_character_to_be_unchanged()
	})
})

const PROPERTY = "sex"
const VALUE = SEXES[1].code

//TODO P2 Clean data from character page, since it is mostly unnecesary, primarily on render
