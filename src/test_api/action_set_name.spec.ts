//jest.mock("@core/utils/UpdateCharacter", () => Promise.resolve())
import {
	call_character_sheet_api,
	character_sheet_request,
	expect_character_to_have_attribute_set,
	updateCharacterSpy
} from "./utils"

describe("set_value name should", () => {
	beforeEach(() => {
		updateCharacterSpy.mockReturnValue(Promise.resolve())
	})

	afterEach(() => {
		updateCharacterSpy.mockReset()
	})

	it("change the name of the character", async () => {
		const request = character_sheet_request([
			{ action: "set_value", property: PROPERTY_NAME, value: CHARACTER_NAME }
		])

		const result = await call_character_sheet_api(request)

		expect_character_to_have_attribute_set({ name: CHARACTER_NAME })
		expect(result.statusCode).toBe(200)
	})
})

const PROPERTY_NAME = "name"
const CHARACTER_NAME = "linuar"
