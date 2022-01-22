import { SKILL_DEFINITIONS } from "@core/domain/skill/SKILL_DEFINITIONS"
import {
	call_character_sheet_api,
	character_sheet_request,
	expect_character_to_have_attribute_set,
	updateCharacterSpy
} from "@tests/api_tests/utils"

describe("add_to_array focus should", () => {
	beforeEach(() => {
		updateCharacterSpy.mockReturnValue(Promise.resolve())
	})

	afterEach(() => {
		updateCharacterSpy.mockReset()
	})

	it("set_value focus to the character", async () => {
		const request = character_sheet_request([
			{
				action: "set_value",
				property: PROPERTY,
				value: VALUE
			}
		])

		const result = await call_character_sheet_api(request)

		expect_character_to_have_attribute_set({ [PROPERTY]: VALUE })
		expect(result.statusCode).toBe(200)
	})
})

const PROPERTY = `focuses.${SKILL_DEFINITIONS[0].code}`
const VALUE = ["cultured"]
