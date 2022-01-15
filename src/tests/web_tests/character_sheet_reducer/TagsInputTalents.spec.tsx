import { SKILL_DEFINITIONS } from "@core/domain/skill/SKILL_DEFINITIONS"
import { fireEvent } from "@testing-library/react"
import { ACCORDION_ITEM } from "@web/constants/ACCORDION_ITEM"
import { TEST_TALENTS } from "./utils/collections"
import {
	click_menu_item,
	render_character_sheet,
	select_combobox_item,
	update_character_api_was_called_with
} from "./utils/utils"

const PRE_EXISTING_TALENT = TEST_TALENTS[1]
const NEW_TALENT = TEST_TALENTS[2]

describe("Talents Tag Input should", () => {
	it("send a 'add_to_array|talents' action on add", async () => {
		await render_character_sheet()

		const context = await click_menu_item(ACCORDION_ITEM.TALENTS)
		await select_combobox_item("Talent", NEW_TALENT, context)

		await update_character_api_was_called_with([
			{
				action: "add_to_array",
				property: "talents",
				value: NEW_TALENT.code
			}
		])
	})

	it("send a 'remove_from_array|talents' action on remove", async () => {
		await render_character_sheet({ talents: [PRE_EXISTING_TALENT.code] })

		const context = await click_menu_item(ACCORDION_ITEM.TALENTS)
		const tag = context.getByText(PRE_EXISTING_TALENT.name)
		fireEvent.click(tag)

		await update_character_api_was_called_with([
			{
				action: "remove_from_array",
				property: "talents",
				value: PRE_EXISTING_TALENT.code
			}
		])
	})
})
