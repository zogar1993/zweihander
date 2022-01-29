import {
	expect_character_to_be_unchanged,
	expect_character_to_have_attribute_set,
	update_character
} from "@tests/api_tests/utils"
import { SETTINGS_SKILL_ORDER } from "@web/components/character_sheet/bio/Constants"

describe("set_value settings.skill_order should", () => {
	it("change the skill_order settings of the character", async () => {
		const result = await update_character(["set_value", PROPERTY, VALUE])

		expect(result.statusCode).toBe(200)
		expect_character_to_have_attribute_set({ [PROPERTY]: VALUE })
	})

	it("accept only predefined skills orders", async () => {
		const result = await update_character(["set_value", PROPERTY, "whatever"])

		expect(result.statusCode).toBe(409)
		expect_character_to_be_unchanged()
	})

	it("not accept null", async () => {
		const result = await update_character(["set_value", PROPERTY, null])

		expect(result.statusCode).toBe(400)
		expect_character_to_be_unchanged()
	})

	it("accept only strings", async () => {
		const result = await update_character(["set_value", PROPERTY, 1])

		expect(result.statusCode).toBe(400)
		expect_character_to_be_unchanged()
	})
})

const PROPERTY = "settings.skill_order"
const VALUE = SETTINGS_SKILL_ORDER[1].code
