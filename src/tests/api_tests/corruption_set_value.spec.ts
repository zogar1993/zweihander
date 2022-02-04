import {
	expect_character_to_be_unchanged,
	expect_character_to_have_attribute_set,
	update_character
} from "@tests/api_tests/utils"

describe("set_value corruption should", () => {
	it("change the corruption of the character", async () => {
		const result = await update_character(["set_value", PROPERTY, VALUE])

		expect_character_to_have_attribute_set({ [PROPERTY]: VALUE })
		expect(result).toHaveStatusCode(200)
	})

	it("accept only numbers", async () => {
		const result = await update_character(["set_value", PROPERTY, "a_string"])

		expect(result).toHaveStatusCode(400)
		expect_character_to_be_unchanged()
	})

	it("accept only integers", async () => {
		const result = await update_character(["set_value", PROPERTY, 2.5])

		expect(result).toHaveStatusCode(400)
		expect_character_to_be_unchanged()
	})

	it("not accept null", async () => {
		const result = await update_character(["set_value", PROPERTY, null])

		expect(result).toHaveStatusCode(400)
		expect_character_to_be_unchanged()
	})

	it("not accept lower than 0", async () => {
		const result = await update_character(["set_value", PROPERTY, -1])

		expect(result).toHaveStatusCode(400)
		expect_character_to_be_unchanged()
	})

	it("accept minimum 0", async () => {
		const result = await update_character(["set_value", PROPERTY, 0])

		expect(result).toHaveStatusCode(200)
		expect_character_to_have_attribute_set({ [PROPERTY]: 0 })
	})

	it("not accept higher than 9", async () => {
		const result = await update_character(["set_value", PROPERTY, 10])

		expect(result).toHaveStatusCode(400)
		expect_character_to_be_unchanged()
	})

	it("accept maximum 9", async () => {
		const result = await update_character(["set_value", PROPERTY, 9])

		expect(result).toHaveStatusCode(200)
		expect_character_to_have_attribute_set({ [PROPERTY]: 9 })
	})
})

const PROPERTY = "corruption"
const VALUE = 4
