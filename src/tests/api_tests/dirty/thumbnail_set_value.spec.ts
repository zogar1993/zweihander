import {
	expect_character_to_have_attribute_set,
	update_character
} from "@tests/api_tests/utils"

describe("set_value thumbnail should", () => {
	it("change the thumbnail of the character", async () => {
		const result = await update_character(["set_value", PROPERTY, VALUE])

		expect(result.statusCode).toBe(200)
		expect_character_to_have_attribute_set({ thumbnail: VALUE })
	})
})

const PROPERTY = "thumbnail"
const VALUE = "an_encoded_image"

//TODO P3 Do test for react avatar and thumbnail
//TODO P3 Move thumbnail generation to node
