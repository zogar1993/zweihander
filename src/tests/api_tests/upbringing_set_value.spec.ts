import {
	expect_character_to_be_unchanged,
	expect_character_to_have_attribute_set,
	update_character
} from "@tests/api_tests/utils"

describe("set_value upbringing should", () => {
	it("change the upbringing of the character", async () => {
		const result = await update_character(["set_value", PROPERTY, VALUE])

		expect(result).toHaveStatusCode(204)
		expect_character_to_have_attribute_set({ upbringing: VALUE })
	})

	it("accept null", async () => {
		const result = await update_character(["set_value", PROPERTY, null])

		expect(result).toHaveStatusCode(204)
		expect_character_to_have_attribute_set({ upbringing: null })
	})

	it("accept only predefined upbringings", async () => {
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

const PROPERTY = "upbringing"
const VALUE = "cultured"
