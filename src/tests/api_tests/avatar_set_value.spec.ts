import {
	expect_character_to_be_unchanged,
	expect_character_to_have_attribute_set,
	update_character
} from "@tests/api_tests/utils"

describe("set_value avatar should", () => {
	it("change the avatar of the character", async () => {
		const result = await update_character(["set_value", PROPERTY, VALUE])

		expect(result).toHaveStatusCode(200)
		expect_character_to_have_attribute_set({ [PROPERTY]: VALUE })
	})

	it("accept only strings", async () => {
		const result = await update_character(["set_value", PROPERTY, 1])

		expect(result).toHaveStatusCode(400)
		expect_character_to_be_unchanged()
	})

	it("accept null", async () => {
		const result = await update_character(["set_value", PROPERTY, null])

		expect(result).toHaveStatusCode(200)
		expect_character_to_have_attribute_set({ [PROPERTY]: null })
	})
})

const PROPERTY = "avatar"
const VALUE = "an_encoded_image"
