import { TEST_TALENTS } from "@tests/web_tests/character_sheet/utils/collections"

describe("Character Sheet Screen should", () => {
	it("undo add to array", async () => {
		//await render_character_sheet({ talents: [TALENT_1.code] })
		//const context = await click_menu_item(ACCORDION_ITEM.TALENTS)
		//
		//await select_combobox_item("Talent", TALENT_1, context)
	})
})
//TODO test undo functionality
const TALENT_1 = TEST_TALENTS[1]
const TALENT_2 = TEST_TALENTS[2]

//const context = await click_menu_item(ACCORDION_ITEM.TALENTS)
//const tag = context.getByText(PRE_EXISTING_TALENT.name)
//fireEvent.click(tag)
//
//const context = await click_menu_item(ACCORDION_ITEM.TALENTS)
//await select_combobox_item("Talent", NEW_TALENT, context)
//
//await update_character_api_was_called_with([
//	{
//		action: "add_to_array",
//		property: "talents",
//		value: NEW_TALENT.code
//	}
//])
