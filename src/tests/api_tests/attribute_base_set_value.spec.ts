import { ATTRIBUTE_DEFINITIONS } from "@core/domain/attribute/ATTRIBUTE_DEFINITIONS"
import {
	expect_character_to_be_unchanged,
	expect_character_to_have_attribute_set,
	update_character
} from "@tests/api_tests/utils"

describe("set_value attributes.{code}.base should", () => {
	it("change the attribute base of the character", async () => {
		const result = await update_character(["set_value", PROPERTY, VALUE])

		expect(result).toHaveStatusCode(200)
		expect_character_to_have_attribute_set({ [PROPERTY]: VALUE })
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

	it("not accept lower than 28", async () => {
		const result = await update_character(["set_value", PROPERTY, 27])

		expect(result).toHaveStatusCode(400)
		expect_character_to_be_unchanged()
	})

	it("accept minimum 28", async () => {
		const result = await update_character(["set_value", PROPERTY, 28])

		expect(result).toHaveStatusCode(200)
		expect_character_to_have_attribute_set({ [PROPERTY]: 28 })
	})

	it("not accept higher than 55", async () => {
		const result = await update_character(["set_value", PROPERTY, 56])

		expect(result).toHaveStatusCode(400)
		expect_character_to_be_unchanged()
	})

	it("accept maximum 55", async () => {
		const result = await update_character(["set_value", PROPERTY, 55])

		expect(result).toHaveStatusCode(200)
		expect_character_to_have_attribute_set({ [PROPERTY]: 55 })
	})

	it("not accept non attribute path", async () => {
		const result = await update_character([
			"set_value",
			"attributes.whatever.base",
			VALUE
		])

		expect(result).toHaveStatusCode(400)
		expect_character_to_be_unchanged()
	})
})

const PROPERTY = `attributes.${ATTRIBUTE_DEFINITIONS[0].code}.base`
const VALUE = 45
