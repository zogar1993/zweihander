import {
	call_character_sheet_api,
	character_sheet_request,
	expect_character_to_have_attribute_set,
	updateCharacterSpy
} from "./utils"

describe("set_value archetype should", () => {
	beforeEach(() => {
		updateCharacterSpy.mockReturnValue(Promise.resolve())
	})

	afterEach(() => {
		updateCharacterSpy.mockReset()
	})

	it("change the archetype of the character", async () => {
		const request = character_sheet_request([
			{
				action: "set_value",
				property: PROPERTY_ARCHETYPE,
				value: CHARACTER_ARCHETYPE
			}
		])

		const result = await call_character_sheet_api(request)

		expect_character_to_have_attribute_set({ archetype: CHARACTER_ARCHETYPE })
		expect(result.statusCode).toBe(200)
	})
})

const PROPERTY_ARCHETYPE = "archetype"
const CHARACTER_ARCHETYPE = "ranger"
