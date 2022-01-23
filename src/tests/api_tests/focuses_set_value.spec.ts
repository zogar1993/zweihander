import { SKILL_DEFINITIONS } from "@core/domain/skill/SKILL_DEFINITIONS"
import {
	expect_character_to_be_unchanged,
	expect_character_to_have_attribute_set,
	update_character
} from "@tests/api_tests/utils"

describe("add_to_array focus should", () => {
	it("set_value focus to the character", async () => {
		const result = await update_character(["set_value", PROPERTY, [VALUE]])

		expect(result.statusCode).toBe(200)
		expect_character_to_have_attribute_set({ [PROPERTY]: [VALUE] })
	})

	it("not accept strings", async () => {
		const result = await update_character(["set_value", PROPERTY, VALUE])

		expect(result.statusCode).toBe(400)
		expect_character_to_be_unchanged()
	})

	it("not accept lists of non strings", async () => {
		const result = await update_character(["set_value", PROPERTY, [1]])

		expect(result.statusCode).toBe(400)
		expect_character_to_be_unchanged()
	})

	it("not accept null", async () => {
		const result = await update_character(["set_value", PROPERTY, null])

		expect(result.statusCode).toBe(400)
		expect_character_to_be_unchanged()
	})

	it("not accept non predefined skill", async () => {
		const result = await update_character([
			"set_value",
			`focuses.whatever`,
			[VALUE]
		])

		expect(result.statusCode).toBe(400)
		expect_character_to_be_unchanged()
	})
})

const PROPERTY = `focuses.${SKILL_DEFINITIONS[0].code}`
const VALUE = "a_focus"
