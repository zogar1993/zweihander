import { SKILL_DEFINITIONS } from "@core/domain/skill/SKILL_DEFINITIONS"
import {
	expect_character_to_be_unchanged,
	expect_character_to_have_attribute_set,
	update_character
} from "@tests/api_tests/utils"

describe("set_value skills.{code}.ranks should", () => {
	it("change the skill ranks of the character", async () => {
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

	it("not accept higher than 3", async () => {
		const result = await update_character(["set_value", PROPERTY, 4])

		expect(result.statusCode).toBe(400)
		expect_character_to_be_unchanged()
	})

	it("accept maximum 3", async () => {
		const result = await update_character(["set_value", PROPERTY, 3])

		expect(result.statusCode).toBe(200)
		expect_character_to_have_attribute_set({ [PROPERTY]: 3 })
	})

	it("not accept non skill path", async () => {
		const result = await update_character([
			"set_value",
			"skills.whatever.ranks",
			VALUE
		])

		expect(result.statusCode).toBe(400)
		expect_character_to_be_unchanged()
	})
})

const PROPERTY = `skills.${SKILL_DEFINITIONS[0].code}.ranks`
const VALUE = 1
