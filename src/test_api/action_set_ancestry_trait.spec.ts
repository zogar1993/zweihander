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

	it("change the ancestry trait of the character", async () => {
		const request = character_sheet_request([
			{
				action: "set_value",
				property: PROPERTY_ANCESTRY_TRAIT,
				value: CHARACTER_ANCESTRY_TRAIT
			}
		])

		const result = await call_character_sheet_api(request)

		expect_character_to_have_attribute_set({
			ancestry_trait: CHARACTER_ANCESTRY_TRAIT
		})
		expect(result.statusCode).toBe(200)
	})
})

const PROPERTY_ANCESTRY_TRAIT = "ancestry_trait"
const CHARACTER_ANCESTRY_TRAIT = "dwarf_trait"
