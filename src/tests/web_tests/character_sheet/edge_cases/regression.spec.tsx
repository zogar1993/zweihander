import { SKILL_DEFINITIONS } from "@core/domain/skill/SKILL_DEFINITIONS"
import {
	change_dots_value,
	render_character_sheet,
	then_dots_is_checked_on
} from "../utils/utils"

const SKILL = SKILL_DEFINITIONS[0]

it("any dots fail when setting it to 0 from any value", async () => {
	await render_character_sheet({ skills: { [SKILL.code]: { ranks: 2 } } })

	await change_dots_value(`${SKILL.name} Ranks`, 0)

	await then_dots_is_checked_on(`${SKILL.name} Ranks`, 0)
})
