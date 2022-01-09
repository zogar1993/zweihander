//jest.mock("@core/utils/UpdateCharacter", () => Promise.resolve())
import {
	call_character_sheet_api,
	character_sheet_request,
	expect_character_to_have_attribute_set,
	updateCharacterSpy
} from "./utils"

describe("set_value chaos_alignment should", () => {
	beforeEach(() => {
		updateCharacterSpy.mockReturnValue(Promise.resolve())
	})

	afterEach(() => {
		updateCharacterSpy.mockReset()
	})

	it("change the chaos alignment of the character", async () => {
		const request = character_sheet_request([
			{ action: "set_value", property: CHAOS_ALIGNMENT_PATH, value: CHARACTER_CHAOS_ALIGNMENT }
		])

		const result = await call_character_sheet_api(request)

		expect_character_to_have_attribute_set({
			chaos_alignment: CHARACTER_CHAOS_ALIGNMENT
		})
		expect(result.statusCode).toBe(200)
	})
})

const CHAOS_ALIGNMENT_PATH = "chaos_alignment"
const CHARACTER_CHAOS_ALIGNMENT = "pity"
