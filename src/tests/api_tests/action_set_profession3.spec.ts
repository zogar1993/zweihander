import {
	call_character_sheet_api,
	character_sheet_request,
	expect_character_to_have_attribute_set,
	updateCharacterSpy
} from "./utils"

describe("set_value profession3 should", () => {
	beforeEach(() => {
		updateCharacterSpy.mockReturnValue(Promise.resolve())
	})

	afterEach(() => {
		updateCharacterSpy.mockReset()
	})

	it("change the third profession of the character", async () => {
		const request = character_sheet_request([
			{
				action: "set_value",
				property: PROPERTY_PROFESSION_3,
				value: CHARACTER_PROFESSION_3
			}
		])

		const result = await call_character_sheet_api(request)

		expect_character_to_have_attribute_set({
			profession3: CHARACTER_PROFESSION_3
		})
		expect(result.statusCode).toBe(200)
	})
})

const PROPERTY_PROFESSION_3 = "profession3"
const CHARACTER_PROFESSION_3 = "linuar"
