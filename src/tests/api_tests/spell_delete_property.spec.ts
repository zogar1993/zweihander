import {
	call_character_sheet_api,
	character_sheet_request,
	expect_character_to_have_property_deleted,
	updateCharacterSpy
} from "./utils"

describe("delete_property spell should", () => {
	beforeEach(() => {
		updateCharacterSpy.mockReturnValue(Promise.resolve())
	})

	afterEach(() => {
		updateCharacterSpy.mockReset()
	})

	it("remove magic school from the character", async () => {
		const request = character_sheet_request([
			{
				action: "delete_property",
				property: PROPERTY
			}
		])

		const result = await call_character_sheet_api(request)

		expect_character_to_have_property_deleted(`spells.a_magic`)
		expect(result.statusCode).toBe(200)
	})
})
//TODO unharcoderino
const PROPERTY = `spells.a_magic`
