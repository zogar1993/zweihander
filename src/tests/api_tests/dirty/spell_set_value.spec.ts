import {
	call_character_sheet_api,
	character_sheet_request,
	expect_character_to_have_attribute_set,
	updateCharacterSpy
} from "@tests/api_tests/utils"
import { TEST_MAGIC_SCHOOLS } from "@tests/web_tests/character_sheet_reducer/utils/collections"

describe("add_to_array spell should", () => {
	beforeEach(() => {
		updateCharacterSpy.mockReturnValue(Promise.resolve())
	})

	afterEach(() => {
		updateCharacterSpy.mockReset()
	})

	it("set_value spell to the character", async () => {
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

const PROPERTY = `spells.${TEST_MAGIC_SCHOOLS[1].code}`
const VALUE = ["cultured"]
