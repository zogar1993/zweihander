import { fireEvent, waitFor } from "@testing-library/react"
import { TEST_TALENTS } from "@tests/web_tests/character_sheet/utils/collections"
import { ACCORDION_ITEM } from "@web/constants/ACCORDION_ITEM"
import {
	change_combobox_item,
	click_menu_item,
	is_a_combobox_option,
	render_character_sheet,
	update_character_api_was_called_with
} from "@tests/web_tests/character_sheet/utils/utils"

const PRE_EXISTING_TALENT_1 = TEST_TALENTS[1]
const PRE_EXISTING_TALENT_2 = TEST_TALENTS[2]
const NEW_TALENT = TEST_TALENTS[3]

describe("Talents Tag Input should", () => {
	it("send a 'add_to_array|talents' action on add", async () => {
		await render_character_sheet()

		const context = await click_menu_item(ACCORDION_ITEM.TALENTS)
		await change_combobox_item("Talent", NEW_TALENT, context)

		await update_character_api_was_called_with([
			{
				action: "add_to_array",
				property: "talents",
				value: NEW_TALENT.code
			}
		])
	})

	it("send a 'remove_from_array|talents' action on remove", async () => {
		await render_character_sheet({ talents: [PRE_EXISTING_TALENT_1.code] })

		const context = await click_menu_item(ACCORDION_ITEM.TALENTS)
		const tag = context.getByText(PRE_EXISTING_TALENT_1.name)
		fireEvent.click(tag)

		await update_character_api_was_called_with([
			{
				action: "remove_from_array",
				property: "talents",
				value: PRE_EXISTING_TALENT_1.code
			}
		])
	})

	it("not have preexisting values as eligible", async () => {
		await render_character_sheet({ talents: [PRE_EXISTING_TALENT_1.code] })
		const context = await click_menu_item(ACCORDION_ITEM.TALENTS)

		await waitFor(async () =>
			expect(
				await is_a_combobox_option("Talent", PRE_EXISTING_TALENT_1, context)
			).toBeFalsy()
		)
	})

	it("not have newly added value as eligible", async () => {
		await render_character_sheet()
		const context = await click_menu_item(ACCORDION_ITEM.TALENTS)
		await change_combobox_item("Talent", NEW_TALENT, context)

		await waitFor(async () =>
			expect(
				await is_a_combobox_option("Talent", NEW_TALENT, context)
			).toBeFalsy()
		)
	})

	it("have removed value as eligible", async () => {
		await render_character_sheet({ talents: [PRE_EXISTING_TALENT_1.code] })
		const context = await click_menu_item(ACCORDION_ITEM.TALENTS)
		fireEvent.click(context.getByText(PRE_EXISTING_TALENT_1.name))

		await waitFor(async () =>
			expect(
				await is_a_combobox_option("Talent", PRE_EXISTING_TALENT_1, context)
			).toBeTruthy()
		)
	})
})
