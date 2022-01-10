import {
	call_character_sheet_api,
	character_sheet_request,
	expect_character_to_have_attribute_set,
	updateCharacterSpy
} from "./utils"

describe("set_value profession_2 should", () => {
	beforeEach(() => {
		updateCharacterSpy.mockReturnValue(Promise.resolve())
	})

	afterEach(() => {
		updateCharacterSpy.mockReset()
	})

	it("change the second profession of the character", async () => {
		const request = character_sheet_request([
			{
				action: "set_value",
				property: PROPERTY_PROFESSION_2,
				value: CHARACTER_PROFESSION_2
			}
		])

		const result = await call_character_sheet_api(request)

		expect_character_to_have_attribute_set({
			profession_2: CHARACTER_PROFESSION_2
		})
		expect(result.statusCode).toBe(200)
	})
})

const PROPERTY_PROFESSION_2 = "profession_2"
const CHARACTER_PROFESSION_2 = "linuar"
