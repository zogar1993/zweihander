import {
	expect_character_to_be_unchanged,
	expect_character_to_have_attribute_set,
	update_character
} from "@tests/api_tests/utils"

describe("set_value damage should", () => {
	it("accept only numbers", async () => {
		const result = await update_character(["set_value", PROPERTY, "a_string"])

		expect(result.statusCode).toBe(400)
		expect_character_to_be_unchanged()
	})

	it("accept only integers", async () => {
		const result = await update_character(["set_value", PROPERTY, 2.5])

		expect(result.statusCode).toBe(400)
		expect_character_to_be_unchanged()
	})

	it("not accept null", async () => {
		const result = await update_character(["set_value", PROPERTY, null])

		expect(result.statusCode).toBe(400)
		expect_character_to_be_unchanged()
	})

	it("not accept lower than 0", async () => {
		const result = await update_character(["set_value", PROPERTY, -1])

		expect(result.statusCode).toBe(400)
		expect_character_to_be_unchanged()
	})

	it("accept minimum 0", async () => {
		const result = await update_character(["set_value", PROPERTY, 0])

		expect(result.statusCode).toBe(200)
		expect_character_to_have_attribute_set({ [PROPERTY]: 0 })
	})

	it("not accept higher than 5", async () => {
		const result = await update_character(["set_value", PROPERTY, 6])

		expect(result.statusCode).toBe(400)
		expect_character_to_be_unchanged()
	})

	it("accept maximum 5", async () => {
		const result = await update_character(["set_value", PROPERTY, 5])

		expect(result.statusCode).toBe(200)
		expect_character_to_have_attribute_set({ [PROPERTY]: 5 })
	})
})

const PROPERTY = "damage"
