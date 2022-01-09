//jest.mock("@core/utils/UpdateCharacter", () => Promise.resolve())
import {
	call_character_sheet_api,
	character_sheet_request,
	expect_character_to_have_attribute_set,
	updateCharacterSpy
} from "./utils"

describe("set_value ancestry should", () => {
	beforeEach(() => {
		updateCharacterSpy.mockReturnValue(Promise.resolve())
	})

	afterEach(() => {
		updateCharacterSpy.mockReset()
	})

	it("change the ancestry of the character", async () => {
		const request = character_sheet_request([
			{
				action: "set_value",
				property: PROPERTY_ANCESTRY,
				value: CHARACTER_ANCESTRY
			}
		])

		const result = await call_character_sheet_api(request)

		expect_character_to_have_attribute_set({ ancestry: CHARACTER_ANCESTRY })
		expect(result.statusCode).toBe(200)
	})
})

const PROPERTY_ANCESTRY = "ancestry"
const CHARACTER_ANCESTRY = "dwarf"
