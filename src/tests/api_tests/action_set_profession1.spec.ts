import {
	call_character_sheet_api,
	character_sheet_request,
	expect_character_to_have_attribute_set,
	updateCharacterSpy
} from "./utils"

describe("set_value profession1 should", () => {
	beforeEach(() => {
		updateCharacterSpy.mockReturnValue(Promise.resolve())
	})

	afterEach(() => {
		updateCharacterSpy.mockReset()
	})

	it("change the first profession of the character", async () => {
		const request = character_sheet_request([
			{
				action: "set_value",
				property: PROPERTY_PROFESSION_1,
				value: CHARACTER_PROFESSION_1
			}
		])

		const result = await call_character_sheet_api(request)

		expect_character_to_have_attribute_set({
			profession1: CHARACTER_PROFESSION_1
		})
		expect(result.statusCode).toBe(200)
	})
})

const PROPERTY_PROFESSION_1 = "profession1"
const CHARACTER_PROFESSION_1 = "linuar"
