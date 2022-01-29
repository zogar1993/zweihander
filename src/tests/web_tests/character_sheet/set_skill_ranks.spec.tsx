import { SKILL_DEFINITIONS } from "@core/domain/skill/SKILL_DEFINITIONS"
import {
	change_dots_value,
	render_character_sheet,
	update_character_api_was_called_with
} from "@tests/web_tests/character_sheet/utils/utils"

const NEW_SKILL_RANKS = 2
const SKILL = SKILL_DEFINITIONS[2]

describe("Skill Ranks Dots should", () => {
	it("send a 'set_value|skills.{code}.ranks' action on change", async () => {
		await render_character_sheet()

		await change_dots_value(`${SKILL.name} Ranks`, NEW_SKILL_RANKS)

		await update_character_api_was_called_with([
			{
				action: "set_value",
				property: `skills.${SKILL.code}.ranks`,
				value: NEW_SKILL_RANKS
			}
		])
	})
})
