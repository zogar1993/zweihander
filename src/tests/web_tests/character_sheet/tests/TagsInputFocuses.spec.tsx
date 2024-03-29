import { SKILL_DEFINITIONS } from "@core/domain/skill/SKILL_DEFINITIONS"
import { fireEvent } from "@testing-library/react"
import { when_combobox_item_is_changed } from "@tests/web_tests/character_sheet/utils/combobox-helpers"
import { when_textbox_value_is_changed } from "@tests/web_tests/character_sheet/utils/textbox-helpers"
import {
	click_menu_item,
	render_character_sheet,
	update_character_api_was_called_with
} from "@tests/web_tests/character_sheet/utils/utils"
import { ACCORDION_ITEM } from "@web/constants/ACCORDION_ITEM"

const SKILL = SKILL_DEFINITIONS[2]
const PRE_EXISTING_FOCUS_1 = "existing focus 1"
const PRE_EXISTING_FOCUS_2 = "existing focus 2"
const NEW_FOCUS = "new focus"

describe("Focuses Tag Input should", () => {
	it("send a 'set_value|focuses.{skill}' action on first add", async () => {
		await render_character_sheet()

		const context = await click_menu_item(ACCORDION_ITEM.FOCUSES)
		await when_combobox_item_is_changed("Skill", SKILL, context)
		await when_textbox_value_is_changed("Focus", NEW_FOCUS, context)
		const button = context.getByRole("button")
		fireEvent.click(button)

		await update_character_api_was_called_with([
			{
				action: "set_value",
				property: `focuses.${SKILL.code}`,
				value: [NEW_FOCUS]
			}
		])
	})

	it("send a 'add_to_array|focuses.{skill}' action on non first add", async () => {
		await render_character_sheet({
			focuses: { [SKILL.code]: [PRE_EXISTING_FOCUS_1] }
		})

		const context = await click_menu_item(ACCORDION_ITEM.FOCUSES)
		await when_combobox_item_is_changed("Skill", SKILL, context)
		await when_textbox_value_is_changed("Focus", NEW_FOCUS, context)
		const button = context.getByRole("button")
		fireEvent.click(button)

		await update_character_api_was_called_with([
			{
				action: "add_to_array",
				property: `focuses.${SKILL.code}`,
				value: NEW_FOCUS
			}
		])
	})

	it("send a 'delete_property|focuses.{skill}' action on last remove", async () => {
		await render_character_sheet({
			focuses: { [SKILL.code]: [PRE_EXISTING_FOCUS_1] }
		})

		const context = await click_menu_item(ACCORDION_ITEM.FOCUSES)
		const tag = context.getByText(PRE_EXISTING_FOCUS_1)
		fireEvent.click(tag)

		await update_character_api_was_called_with([
			{
				action: "delete_property",
				property: `focuses.${SKILL.code}`
			}
		])
	})

	it("send a 'remove_from_array|focuses.{skill}' action on non last remove", async () => {
		await render_character_sheet({
			focuses: {
				[SKILL.code]: [PRE_EXISTING_FOCUS_1, PRE_EXISTING_FOCUS_2]
			}
		})

		const context = await click_menu_item(ACCORDION_ITEM.FOCUSES)
		const tag = context.getByText(PRE_EXISTING_FOCUS_2)
		fireEvent.click(tag)

		await update_character_api_was_called_with([
			{
				action: "remove_from_array",
				property: `focuses.${SKILL.code}`,
				value: PRE_EXISTING_FOCUS_2
			}
		])
	})
})
