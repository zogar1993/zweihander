import {
	call_character_sheet_api,
	character_sheet_request,
	expect_character_to_have_property_deleted,
	updateCharacterSpy
} from "@tests/api_tests/utils"
import { TEST_MAGIC_SCHOOLS } from "@tests/web_tests/character_sheet_reducer/utils/collections"

describe("delete_property spell should", () => {
	beforeEach(() => {
		updateCharacterSpy.mockReturnValue(Promise.resolve())
	})

	afterEach(() => {
		updateCharacterSpy.mockReset()
	})

	it("remove magic school from the character", async () => {
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

const PROPERTY = `spells.${TEST_MAGIC_SCHOOLS[1].code}`
