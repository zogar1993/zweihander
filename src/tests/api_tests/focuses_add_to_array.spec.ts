import { SKILL_DEFINITIONS } from "@core/domain/skill/SKILL_DEFINITIONS"
import {
	expect_character_to_have_item_added,
	the_saved_character_has,
	update_character,
	updateCharacterSpy
} from "./utils"

describe("add_to_array focus should", () => {
	beforeEach(() => {
		updateCharacterSpy.mockReturnValue(Promise.resolve())
	})

	afterEach(() => {
		updateCharacterSpy.mockReset()
	})

	it("add the focus to the character", async () => {
		the_saved_character_has({ focuses: { [SKILL.code]: [IRRELEVANT_VALUE] } })

		const result = await update_character(["add_to_array", PROPERTY, VALUE])

		expect_character_to_have_item_added({ [PROPERTY]: VALUE })
		expect(result.statusCode).toBe(200)
	})
})

const SKILL = SKILL_DEFINITIONS[1]
const PROPERTY = `focuses.${SKILL.code}`
const VALUE = "cultured"
const IRRELEVANT_VALUE = "irrelevant"
