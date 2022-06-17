import { SKILL_DEFINITIONS } from "@core/domain/skill/SKILL_DEFINITIONS"
import {
	expect_character_to_have_property_deleted,
	the_saved_character_has,
	update_character
} from "@tests/api_tests/utils"

describe("delete_property focus should", () => {
	it("remove skill focuses from the character", async () => {
		the_saved_character_has({ focuses: { [SKILL.code]: [IRRELEVANT_VALUE] } })

		const result = await update_character(["delete_property", PROPERTY])

		expect(result).toHaveStatusCode(204)
		expect_character_to_have_property_deleted(PROPERTY)
	})
})

const SKILL = SKILL_DEFINITIONS[1]
const PROPERTY = `focuses.${SKILL.code}`
const IRRELEVANT_VALUE = "irrelevant"
