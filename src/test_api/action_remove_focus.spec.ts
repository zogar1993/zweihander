import { SKILL_DEFINITIONS } from "@core/domain/skill/SKILL_DEFINITIONS"
import {
	call_character_sheet_api,
	character_sheet_request,
	expect_character_to_have_item_removed,
	updateCharacterSpy
} from "./utils"

describe("remove_from_array focus should", () => {
	beforeEach(() => {
		updateCharacterSpy.mockReturnValue(Promise.resolve())
	})

	afterEach(() => {
		updateCharacterSpy.mockReset()
	})

	it("remove the focus from the character", async () => {
		const request = character_sheet_request([
			{
				action: "remove_from_array",
				property: PROPERTY_FOCUSES,
				value: CHARACTER_FOCUS
			}
		])

		const result = await call_character_sheet_api(request)

		expect_character_to_have_item_removed({
			[`focuses.${SKILL_DEFINITIONS[0].code}`]: CHARACTER_FOCUS
		})
		expect(result.statusCode).toBe(200)
	})
})

const PROPERTY_FOCUSES = `focuses.${SKILL_DEFINITIONS[0].code}`
const CHARACTER_FOCUS = "cultured"
