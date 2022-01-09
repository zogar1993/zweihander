//jest.mock("@core/utils/UpdateCharacter", () => Promise.resolve())
import {
	call_character_sheet_api,
	character_sheet_request,
	expect_character_to_have_attribute_set,
	updateCharacterSpy
} from "./utils"

describe("set_value social_class should", () => {
	beforeEach(() => {
		updateCharacterSpy.mockReturnValue(Promise.resolve())
	})

	afterEach(() => {
		updateCharacterSpy.mockReset()
	})

	it("change the social class of the character", async () => {
		const request = character_sheet_request([
			{
				action: "set_value",
				property: PROPERTY_SOCIAL_CLASS,
				value: CHARACTER_SOCIAL_CLASS
			}
		])

		const result = await call_character_sheet_api(request)

		expect_character_to_have_attribute_set({ social_class: CHARACTER_SOCIAL_CLASS })
		expect(result.statusCode).toBe(200)
	})
})

const PROPERTY_SOCIAL_CLASS = "social_class"
const CHARACTER_SOCIAL_CLASS = "lowborn"

//TODO Clean data from character page, since it is mostly unnecesary, primarily on render
