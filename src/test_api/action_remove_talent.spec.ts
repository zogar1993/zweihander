import {
	call_character_sheet_api,
	character_sheet_request,
	expect_character_to_have_item_removed,
	updateCharacterSpy
} from "./utils"

describe("remove_from_array talent should", () => {
	beforeEach(() => {
		updateCharacterSpy.mockReturnValue(Promise.resolve())
	})

	afterEach(() => {
		updateCharacterSpy.mockReset()
	})

	it("remove the talent from the character", async () => {
		const request = character_sheet_request([
			{
				action: "remove_from_array",
				property: PROPERTY_TALENTS,
				value: CHARACTER_TALENT
			}
		])

		const result = await call_character_sheet_api(request)

		expect_character_to_have_item_removed({ talents: CHARACTER_TALENT })
		expect(result.statusCode).toBe(200)
	})
})

const PROPERTY_TALENTS = "talents"
const CHARACTER_TALENT = "cultured"
