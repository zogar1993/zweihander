import { SKILL_DEFINITIONS } from "@core/domain/skill/SKILL_DEFINITIONS"
import {
	call_character_sheet_api,
	character_sheet_request,
	expect_character_to_have_property_deleted,
	updateCharacterSpy
} from "@tests/api_tests/utils"

describe("delete_property focus should", () => {
	beforeEach(() => {
		updateCharacterSpy.mockReturnValue(Promise.resolve())
	})

	afterEach(() => {
		updateCharacterSpy.mockReset()
	})

	it("remove skill focuses from the character", async () => {
		const request = character_sheet_request([
			{
				action: "delete_property",
				property: PROPERTY
			}
		])

		const result = await call_character_sheet_api(request)

		expect_character_to_have_property_deleted(PROPERTY)
		expect(result.statusCode).toBe(200)
	})
})

const PROPERTY = `focuses.${SKILL_DEFINITIONS[0].code}`
