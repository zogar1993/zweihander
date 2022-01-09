//jest.mock("@core/utils/UpdateCharacter", () => Promise.resolve())
import {
	call_character_sheet_api,
	character_sheet_request,
	expect_character_to_have_attribute_set,
	updateCharacterSpy
} from "./utils"

describe("set_value upbringing should", () => {
	beforeEach(() => {
		updateCharacterSpy.mockReturnValue(Promise.resolve())
	})

	afterEach(() => {
		updateCharacterSpy.mockReset()
	})

	it("change the upbringing of the character", async () => {
		const request = character_sheet_request([
			{
				action: "set_value",
				property: PROPERTY_UPBRINGING,
				value: CHARACTER_UPBRINGING
			}
		])

		const result = await call_character_sheet_api(request)

		expect_character_to_have_attribute_set({ upbringing: CHARACTER_UPBRINGING })
		expect(result.statusCode).toBe(200)
	})
})

const PROPERTY_UPBRINGING = "upbringing"
const CHARACTER_UPBRINGING = "cultured"

//TODO Clean data from character page, since it is mostly unnecesary, primarily on render
