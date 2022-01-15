import { fireEvent } from "@testing-library/react"
import { ACCORDION_ITEM } from "@web/constants/ACCORDION_ITEM"
import { TEST_MAGIC_SCHOOLS } from "./utils/collections"
import {
	click_menu_item,
	render_character_sheet,
	select_combobox_item,
	update_character_api_was_called_with
} from "./utils/utils"

const SCHOOL = TEST_MAGIC_SCHOOLS[2]
const PRE_EXISTING_SPELL_1 = SCHOOL.spells[1]
const PRE_EXISTING_SPELL_2 = SCHOOL.spells[2]
const NEW_SPELL = SCHOOL.spells[3]

describe("Spells Tag Input should", () => {
	it("send a 'set_value|spells.{schools}' action on first add", async () => {
		await render_character_sheet()

		const context = await click_menu_item(ACCORDION_ITEM.SPELLS)
		await select_combobox_item("School", SCHOOL, context)
		await select_combobox_item("Spell", NEW_SPELL, context)
		const button = context.getByRole("button")
		fireEvent.click(button)

		await update_character_api_was_called_with([
			{
				action: "set_value",
				property: `spells.${SCHOOL.code}`,
				value: [NEW_SPELL.code]
			}
		])
	})

	it("send a 'add_to_array|spells.{schools}' action on non first add", async () => {
		await render_character_sheet({
			spells: { [SCHOOL.code]: [PRE_EXISTING_SPELL_1.code] }
		})

		const context = await click_menu_item(ACCORDION_ITEM.SPELLS)
		await select_combobox_item("School", SCHOOL, context)
		await select_combobox_item("Spell", NEW_SPELL, context)
		const button = context.getByRole("button")
		fireEvent.click(button)

		await update_character_api_was_called_with([
			{
				action: "add_to_array",
				property: `spells.${SCHOOL.code}`,
				value: NEW_SPELL.code
			}
		])
	})

	it("send a 'delete_property|spells.{schools}' action on last remove", async () => {
		await render_character_sheet({
			spells: { [SCHOOL.code]: [PRE_EXISTING_SPELL_1.code] }
		})

		const context = await click_menu_item(ACCORDION_ITEM.SPELLS)
		const tag = context.getByText(PRE_EXISTING_SPELL_1.name)
		fireEvent.click(tag)

		await update_character_api_was_called_with([
			{
				action: "delete_property",
				property: `spells.${SCHOOL.code}`
			}
		])
	})

	it("send a 'remove_from_array|spells.{schools}' action on non last remove", async () => {
		await render_character_sheet({
			spells: {
				[SCHOOL.code]: [PRE_EXISTING_SPELL_1.code, PRE_EXISTING_SPELL_2.code]
			}
		})

		const context = await click_menu_item(ACCORDION_ITEM.SPELLS)
		const tag = context.getByText(PRE_EXISTING_SPELL_2.name)
		fireEvent.click(tag)

		await update_character_api_was_called_with([
			{
				action: "remove_from_array",
				property: `spells.${SCHOOL.code}`,
				value: PRE_EXISTING_SPELL_2.code
			}
		])
	})
})
