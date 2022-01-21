import { TEST_MAGIC_SCHOOLS } from "../web_tests/character_sheet_reducer/utils/collections"
import {
	expect_character_to_have_item_added,
	the_saved_character_has,
	update_character,
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
		the_saved_character_has({ spells: { [SCHOOL.code]: [IRRELEVANT_VALUE] } })

		const result = await update_character(["add_to_array", PROPERTY, VALUE])

		expect_character_to_have_item_added({ [PROPERTY]: VALUE })
		expect(result.statusCode).toBe(200)
	})
})

const SCHOOL = TEST_MAGIC_SCHOOLS[1]
const VALUE = SCHOOL.spells[1].code
const PROPERTY = `spells.${SCHOOL.code}`
const IRRELEVANT_VALUE = "irrelevant"
