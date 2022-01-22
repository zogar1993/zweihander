import { ATTRIBUTE_DEFINITIONS } from "@core/domain/attribute/ATTRIBUTE_DEFINITIONS"
import {
	expect_character_to_have_attribute_set,
	update_character
} from "@tests/api_tests/utils"

describe("set_value attributes.{code}.advances should", () => {
	it("change the attribute advances of the character", async () => {
		const result = await update_character(["set_value", PROPERTY, VALUE])

		expect_character_to_have_attribute_set({ [PROPERTY]: VALUE })
		expect(result.statusCode).toBe(200)
	})
})

const PROPERTY = `attributes.${ATTRIBUTE_DEFINITIONS[0].code}.advances`
const VALUE = 1
