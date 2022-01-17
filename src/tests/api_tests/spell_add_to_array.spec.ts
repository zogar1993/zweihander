import { TEST_MAGIC_SCHOOLS } from "../web_tests/character_sheet_reducer/utils/collections"
import {
	call_character_sheet_api,
	character_sheet_request,
	expect_character_to_have_item_added,
	updateCharacterSpy
} from "./utils"

describe("add_to_array spell should", () => {
	beforeEach(() => {
		updateCharacterSpy.mockReturnValue(Promise.resolve())
	})

	afterEach(() => {
		updateCharacterSpy.mockReset()
	})

	it("add the spell to the character", async () => {
		const request = character_sheet_request([
			{
				action: "add_to_array",
				property: PROPERTY_SPELLS,
				value: CHARACTER_SPELL
			}
		])

		const result = await call_character_sheet_api(request)

		expect_character_to_have_item_added({
			[PROPERTY_SPELLS]: CHARACTER_SPELL
		})
		expect(result.statusCode).toBe(200)
	})
})

const PROPERTY_SPELLS = `spells.${TEST_MAGIC_SCHOOLS[1].code}`
const CHARACTER_SPELL = "cultured"
