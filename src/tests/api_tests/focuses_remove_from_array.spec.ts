import { SKILL_DEFINITIONS } from "@core/domain/skill/SKILL_DEFINITIONS"
import {
	expect_character_to_have_item_removed,
	the_saved_character_has,
	update_character
} from "./utils"

describe("remove_from_array focus should", () => {
	it("remove the focus from the character", async () => {
		the_saved_character_has({ focuses: { [SKILL.code]: [VALUE] } })

		const result = await update_character([
			"remove_from_array",
			PROPERTY,
			VALUE
		])

		expect_character_to_have_item_removed({ [PROPERTY]: VALUE })
		expect(result.statusCode).toBe(200)
	})
})

const SKILL = SKILL_DEFINITIONS[1]
const PROPERTY = `focuses.${SKILL.code}`
const VALUE = "cultured"
