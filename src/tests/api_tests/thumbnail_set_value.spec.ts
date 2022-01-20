import {
	expect_character_to_have_attribute_set,
	update_character,
	updateCharacterSpy
} from "./utils"

describe("set_value thumbnail should", () => {
	beforeEach(() => {
		updateCharacterSpy.mockReturnValue(Promise.resolve())
	})

	afterEach(() => {
		updateCharacterSpy.mockReset()
	})

	it("change the thumbnail of the character", async () => {
		const result = await update_character(["set_value", PROPERTY, VALUE])

		expect_character_to_have_attribute_set({ thumbnail: VALUE })
		expect(result.statusCode).toBe(200)
	})
})

const PROPERTY = "thumbnail"
const VALUE = "an_encoded_image"

//TODO P3 Do test for react avatar and thumbnail
//TODO P3 Move thumbnail generation to node
