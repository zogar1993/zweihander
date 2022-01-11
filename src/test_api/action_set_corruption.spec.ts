import {
	call_character_sheet_api,
	character_sheet_request,
	expect_character_to_have_attribute_set,
	updateCharacterSpy
} from "./utils"

describe("set_value corruption should", () => {
	beforeEach(() => {
		updateCharacterSpy.mockReturnValue(Promise.resolve())
	})

	afterEach(() => {
		updateCharacterSpy.mockReset()
	})

	it("change the corruption ranks of the character", async () => {
		const request = character_sheet_request([
			{
				action: "set_value",
				property: PROPERTY_CORRUPTION,
				value: CHARACTER_CORRUPTION
			}
		])

		const result = await call_character_sheet_api(request)

		expect_character_to_have_attribute_set({
			corruption: CHARACTER_CORRUPTION
		})
		expect(result.statusCode).toBe(200)
	})
})

const PROPERTY_CORRUPTION = "corruption"
const CHARACTER_CORRUPTION = 4
