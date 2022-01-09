//jest.mock("@core/utils/UpdateCharacter", () => Promise.resolve())
import {
	call_character_sheet_api,
	character_sheet_request,
	expect_character_to_have_attribute_set,
	updateCharacterSpy
} from "./utils"

describe("set_value sex should", () => {
	beforeEach(() => {
		updateCharacterSpy.mockReturnValue(Promise.resolve())
	})

	afterEach(() => {
		updateCharacterSpy.mockReset()
	})

	it("change the sex of the character", async () => {
		const request = character_sheet_request([
			{
				action: "set_value",
				property: PROPERTY_SEX,
				value: CHARACTER_SEX
			}
		])

		const result = await call_character_sheet_api(request)

		expect_character_to_have_attribute_set({ sex: CHARACTER_SEX })
		expect(result.statusCode).toBe(200)
	})
})

const PROPERTY_SEX = "sex"
const CHARACTER_SEX = "female"

//TODO Clean data from character page, since it is mostly unnecesary, primarily on render
