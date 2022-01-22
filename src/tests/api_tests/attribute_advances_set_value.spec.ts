import { ATTRIBUTE_DEFINITIONS } from "@core/domain/attribute/ATTRIBUTE_DEFINITIONS"
import {
	expect_character_to_be_unchanged,
	expect_character_to_have_attribute_set,
	update_character
} from "@tests/api_tests/utils"

describe("set_value attributes.{code}.advances should", () => {
	it("change the attribute advances of the character", async () => {
		const result = await update_character(["set_value", PROPERTY, VALUE])

		expect_character_to_have_attribute_set({ [PROPERTY]: VALUE })
		expect(result.statusCode).toBe(200)
	})

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

	it("not accept higher than 6", async () => {
		const result = await update_character(["set_value", PROPERTY, 7])

		expect(result.statusCode).toBe(400)
		expect_character_to_be_unchanged()
	})

	it("accept maximum 6", async () => {
		const result = await update_character(["set_value", PROPERTY, 6])

		expect(result.statusCode).toBe(200)
		expect_character_to_have_attribute_set({ [PROPERTY]: 6 })
	})

	it("not accept non attribute path", async () => {
		const result = await update_character([
			"set_value",
			"attributes.whatever.advances",
			VALUE
		])

		expect(result.statusCode).toBe(400)
		expect_character_to_be_unchanged()
	})
})

const PROPERTY = `attributes.${ATTRIBUTE_DEFINITIONS[0].code}.advances`
const VALUE = 1
