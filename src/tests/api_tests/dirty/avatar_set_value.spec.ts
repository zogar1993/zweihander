import {
	expect_character_to_have_attribute_set,
	update_character,
	updateCharacterSpy
} from "@tests/api_tests/utils"

describe("set_value avatar should", () => {
	beforeEach(() => {
		updateCharacterSpy.mockReturnValue(Promise.resolve())
	})

	afterEach(() => {
		updateCharacterSpy.mockReset()
	})

	it("change the avatar of the character", async () => {
		const result = await update_character(["set_value", PROPERTY, VALUE])

		expect_character_to_have_attribute_set({ avatar: VALUE })
		expect(result.statusCode).toBe(200)
	})
})

const PROPERTY = "avatar"
const VALUE = "an_encoded_image"
