import { fireEvent, waitFor } from "@testing-library/react"
import {
	then_is_a_combobox_option,
	when_combobox_item_is_changed
} from "@tests/web_tests/character_sheet/utils/combobox-helpers"
import {
	click_menu_item,
	render_character_sheet,
	update_character_api_was_called_with
} from "@tests/web_tests/character_sheet/utils/utils"
import { ACCORDION_ITEM } from "@web/constants/ACCORDION_ITEM"
import { TEST_MAGIC_SCHOOLS } from "../utils/collections"

const SCHOOL = TEST_MAGIC_SCHOOLS[2]
const PRE_EXISTING_SPELL_1 = SCHOOL.spells[1]
const PRE_EXISTING_SPELL_2 = SCHOOL.spells[2]
const NEW_SPELL = SCHOOL.spells[3]

describe("Spells Tag Input should", () => {
	it("send a 'set_value|spells.{schools}' action on first add", async () => {
		await render_character_sheet()

		const context = await click_menu_item(ACCORDION_ITEM.SPELLS)
		await when_combobox_item_is_changed("School", SCHOOL, context)
		await when_combobox_item_is_changed("Spell", NEW_SPELL, context)

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
		await when_combobox_item_is_changed("School", SCHOOL, context)
		await when_combobox_item_is_changed("Spell", NEW_SPELL, context)

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

	it("not have preexisting values as eligible", async () => {
		await render_character_sheet({
			spells: { [SCHOOL.code]: [PRE_EXISTING_SPELL_1.code] }
		})
		const context = await click_menu_item(ACCORDION_ITEM.SPELLS)
		await when_combobox_item_is_changed("School", SCHOOL, context)

		await waitFor(async () =>
			expect(
				await then_is_a_combobox_option("Spell", PRE_EXISTING_SPELL_1, context)
			).toBeFalsy()
		)
	})

	it("not have newly added value as eligible (first item addition)", async () => {
		await render_character_sheet()
		const context = await click_menu_item(ACCORDION_ITEM.SPELLS)
		await when_combobox_item_is_changed("School", SCHOOL, context)
		await when_combobox_item_is_changed("Spell", NEW_SPELL, context)

		await waitFor(async () =>
			expect(
				await then_is_a_combobox_option("Spell", NEW_SPELL, context)
			).toBeFalsy()
		)
	})

	it("not have newly added value as eligible (non first item addition)", async () => {
		await render_character_sheet({
			spells: { [SCHOOL.code]: [PRE_EXISTING_SPELL_1.code] }
		})
		const context = await click_menu_item(ACCORDION_ITEM.SPELLS)
		await when_combobox_item_is_changed("School", SCHOOL, context)
		await when_combobox_item_is_changed("Spell", NEW_SPELL, context)

		await waitFor(async () =>
			expect(
				await then_is_a_combobox_option("Spell", NEW_SPELL, context)
			).toBeFalsy()
		)
	})

	it("have removed value as eligible (last item removal)", async () => {
		await render_character_sheet({
			spells: { [SCHOOL.code]: [PRE_EXISTING_SPELL_1.code] }
		})
		const context = await click_menu_item(ACCORDION_ITEM.SPELLS)
		await when_combobox_item_is_changed("School", SCHOOL, context)
		fireEvent.click(context.getByText(PRE_EXISTING_SPELL_1.name))

		await waitFor(async () =>
			expect(
				await then_is_a_combobox_option("Spell", PRE_EXISTING_SPELL_1, context)
			).toBeTruthy()
		)
	})

	it("have removed value as eligible (non last item removal)", async () => {
		await render_character_sheet({
			spells: {
				[SCHOOL.code]: [PRE_EXISTING_SPELL_1.code, PRE_EXISTING_SPELL_2.code]
			}
		})
		const context = await click_menu_item(ACCORDION_ITEM.SPELLS)
		await when_combobox_item_is_changed("School", SCHOOL, context)
		fireEvent.click(context.getByText(PRE_EXISTING_SPELL_1.name))

		await waitFor(async () =>
			expect(
				await then_is_a_combobox_option("Spell", PRE_EXISTING_SPELL_1, context)
			).toBeTruthy()
		)
	})

	it("have removed value as eligible (removal before selecting school)", async () => {
		await render_character_sheet({
			spells: {
				[SCHOOL.code]: [PRE_EXISTING_SPELL_1.code]
			}
		})
		const context = await click_menu_item(ACCORDION_ITEM.SPELLS)
		fireEvent.click(context.getByText(PRE_EXISTING_SPELL_1.name))

		await when_combobox_item_is_changed("School", SCHOOL, context)

		await waitFor(
			async () =>
				await expect(
					then_is_a_combobox_option("Spell", PRE_EXISTING_SPELL_1, context)
				).toBeTruthy()
		)
	})
})
