import {
	call_character_sheet_api,
	character_sheet_request,
	expect_character_to_have_attribute_set,
	updateCharacterSpy
} from "./utils"

describe("add_to_array spell should", () => {
	beforeEach(() => {
		updateCharacterSpy.mockReturnValue(Promise.resolve())
	})

	afterEach(() => {
		updateCharacterSpy.mockReset()
	})

	it("set_value spell to the character", async () => {
		const request = character_sheet_request([
			{
				action: "set_value",
				property: PROPERTY,
				value: VALUE
			}
		])

		const result = await call_character_sheet_api(request)

		expect_character_to_have_attribute_set({ [`spells.a_magic`]: VALUE })
		expect(result.statusCode).toBe(200)
	})
})
//TODO P0 unharcoderino
const PROPERTY = `spells.a_magic`
const VALUE = ["cultured"]
