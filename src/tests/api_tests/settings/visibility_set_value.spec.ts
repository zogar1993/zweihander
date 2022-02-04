import {
	expect_character_to_be_unchanged,
	expect_character_to_have_attribute_set,
	update_character
} from "@tests/api_tests/utils"
import { SETTINGS_VISIBILITY } from "@web/components/character_sheet/bio/Constants"

describe("set_value settings.visibility should", () => {
	it("change the visibility settings of the character", async () => {
		const result = await update_character(["set_value", PROPERTY, VALUE])

		expect(result).toHaveStatusCode(200)
		expect_character_to_have_attribute_set({ [PROPERTY]: VALUE })
	})

	it("accept only predefined visibilities", async () => {
		const result = await update_character(["set_value", PROPERTY, "whatever"])

		expect(result).toHaveStatusCode(409)
		expect_character_to_be_unchanged()
	})

	it("not accept null", async () => {
		const result = await update_character(["set_value", PROPERTY, null])

		expect(result).toHaveStatusCode(400)
		expect_character_to_be_unchanged()
	})

	it("accept only strings", async () => {
		const result = await update_character(["set_value", PROPERTY, 1])

		expect(result).toHaveStatusCode(400)
		expect_character_to_be_unchanged()
	})
})

const PROPERTY = "settings.visibility"
const VALUE = SETTINGS_VISIBILITY[1].code
