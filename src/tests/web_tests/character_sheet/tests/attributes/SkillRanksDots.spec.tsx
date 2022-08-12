import { SKILL_DEFINITIONS } from "@core/domain/skill/SKILL_DEFINITIONS"
import {
	change_dots_value,
	then_dots_are_disabled,
	then_dots_is_checked_on
} from "@tests/web_tests/character_sheet/utils/dots-helpers"
import {
	A_USER,
	ANOTHER_USER,
	given_your_email_is,
	render_character_sheet,
	update_character_api_was_called_with
} from "@tests/web_tests/character_sheet/utils/utils"

const SKILL_RANKS = 1
const NEW_SKILL_RANKS = 2
const SKILL = SKILL_DEFINITIONS[2]

describe("Skill Ranks Dots should", () => {
	it("show character sheet skill.{code}.ranks value", async () => {
		await render_character_sheet({skills: {[SKILL.code]: {ranks: SKILL_RANKS} }})

		await then_dots_is_checked_on(`${SKILL.name} Ranks`, SKILL_RANKS)
	})

	it("send a 'set_value|skills.{code}.ranks' and show updated value on change", async () => {
		await render_character_sheet({skills: {[SKILL.code]: {ranks: SKILL_RANKS} }})

		await change_dots_value(`${SKILL.name} Ranks`, NEW_SKILL_RANKS)

		await update_character_api_was_called_with([
			{
				action: "set_value",
				property: `skills.${SKILL.code}.ranks`,
				value: NEW_SKILL_RANKS
			}
		])
		await then_dots_is_checked_on(`${SKILL.name} Ranks`, NEW_SKILL_RANKS)
	})

	it("be disabled if it is not yours", async () => {
		await given_your_email_is(A_USER)
		await render_character_sheet({skills: {[SKILL.code]: {ranks: SKILL_RANKS} }, created_by: ANOTHER_USER})

		await then_dots_are_disabled(`${SKILL.name} Ranks`)
		await then_dots_is_checked_on(`${SKILL.name} Ranks`, SKILL_RANKS)
	})


	it("be blank by default", async () => {
		await render_character_sheet({})

		await then_dots_is_checked_on(`${SKILL.name} Ranks`, 0)
	})
})
