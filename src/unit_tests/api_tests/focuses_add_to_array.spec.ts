import { SKILL_DEFINITIONS } from "@core/domain/skill/SKILL_DEFINITIONS"
import {
	expect_character_to_be_unchanged,
	expect_character_to_have_item_added,
	the_saved_character_has,
	update_character
} from "@tests/api_tests/utils"

describe("add_to_array focus should", () => {
	it("add the focus to the character", async () => {
		the_saved_character_has({ focuses: { [SKILL.code]: [IRRELEVANT_VALUE] } })

		const result = await update_character(["add_to_array", PROPERTY, VALUE])

		expect(result).toHaveStatusCode(204)
		expect_character_to_have_item_added({ [PROPERTY]: VALUE })
	})

	it("accept only strings", async () => {
		the_saved_character_has({ focuses: { [SKILL.code]: [IRRELEVANT_VALUE] } })

		const result = await update_character(["add_to_array", PROPERTY, 1])

		expect(result).toHaveStatusCode(400)
		expect_character_to_be_unchanged()
	})

	it("not accept null", async () => {
		the_saved_character_has({ focuses: { [SKILL.code]: [IRRELEVANT_VALUE] } })

		const result = await update_character(["add_to_array", PROPERTY, null])

		expect(result).toHaveStatusCode(400)
		expect_character_to_be_unchanged()
	})

	it("not accept duplicated values", async () => {
		the_saved_character_has({ focuses: { [SKILL.code]: [VALUE] } })

		const result = await update_character(["add_to_array", PROPERTY, VALUE])

		expect(result).toHaveStatusCode(409)
		expect_character_to_be_unchanged()
	})

	it("fail when character has no preexisting array", async () => {
		const result = await update_character(["add_to_array", PROPERTY, VALUE])

		expect(result).toHaveStatusCode(409)
		expect_character_to_be_unchanged()
	})

	it("not accept non predefined skill", async () => {
		the_saved_character_has({ focuses: { [SKILL.code]: [IRRELEVANT_VALUE] } })

		const result = await update_character([
			"add_to_array",
			`focuses.whatever`,
			VALUE
		])

		expect(result).toHaveStatusCode(400)
		expect_character_to_be_unchanged()
	})
})

const SKILL = SKILL_DEFINITIONS[1]
const PROPERTY = `focuses.${SKILL.code}`
const VALUE = "cultured"
const IRRELEVANT_VALUE = "irrelevant"
