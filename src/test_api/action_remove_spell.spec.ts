import {
	call_character_sheet_api,
	character_sheet_request,
	expect_character_to_have_item_removed,
	updateCharacterSpy
} from "./utils"

describe("remove_from_array spell should", () => {
	beforeEach(() => {
		updateCharacterSpy.mockReturnValue(Promise.resolve())
	})

	afterEach(() => {
		updateCharacterSpy.mockReset()
	})

	it("remove the spell from the character", async () => {
		const request = character_sheet_request([
			{
				action: "remove_from_array",
				property: PROPERTY_SPELLS,
				value: CHARACTER_SPELL
			}
		])

		const result = await call_character_sheet_api(request)

		expect_character_to_have_item_removed({ [`spells.a_magic`]: CHARACTER_SPELL })
		expect(result.statusCode).toBe(200)
	})
})

const PROPERTY_SPELLS = `spells.a_magic`
const CHARACTER_SPELL = "cultured"
