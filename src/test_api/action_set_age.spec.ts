//jest.mock("@core/utils/UpdateCharacter", () => Promise.resolve())
import {
	call_character_sheet_api,
	character_sheet_request,
	expect_character_to_have_attribute_set,
	updateCharacterSpy
} from "./utils"

describe("set_value age should", () => {
	beforeEach(() => {
		updateCharacterSpy.mockReturnValue(Promise.resolve())
	})

	afterEach(() => {
		updateCharacterSpy.mockReset()
	})

	it("change the age of the character", async () => {
		const request = character_sheet_request([
			{ action: "set_value", property: PROPERTY_AGE, value: CHARACTER_AGE }
		])

		const result = await call_character_sheet_api(request)

		expect_character_to_have_attribute_set({ age: CHARACTER_AGE })
		expect(result.statusCode).toBe(200)
	})
})

const PROPERTY_AGE = "age"
const CHARACTER_AGE = 36

//TODO Clean data from character page, since it is mostly unnecesary, primarily on render
