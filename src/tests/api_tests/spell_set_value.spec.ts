import {
	expect_character_to_be_unchanged,
	expect_character_to_have_attribute_set,
	update_character
} from "@tests/api_tests/utils"
import { TEST_MAGIC_SCHOOLS } from "@tests/web_tests/character_sheet/utils/collections"

describe("add_to_array spell should", () => {
	it("set_value spell to the character", async () => {
		const result = await update_character(["set_value", PROPERTY, [VALUE]])

		expect_character_to_have_attribute_set({ [PROPERTY]: [VALUE] })
		expect(result.statusCode).toBe(200)
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

	it("not accept non predefined school", async () => {
		const result = await update_character([
			"set_value",
			`spells.whatever`,
			[VALUE]
		])

		expect(result.statusCode).toBe(409)
		expect_character_to_be_unchanged()
	})

	it("not accept non predefined spell", async () => {
		const result = await update_character(["set_value", PROPERTY, ["whatever"]])

		expect(result.statusCode).toBe(409)
		expect_character_to_be_unchanged()
	})
})

const SCHOOL = TEST_MAGIC_SCHOOLS[1]
const VALUE = SCHOOL.spells[1].code
const PROPERTY = `spells.${SCHOOL.code}`
