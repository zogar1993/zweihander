import { ACCORDION_ITEM } from "@web/constants/ACCORDION_ITEM"
import {
	change_textbox_value,
	click_menu_item,
	render_character_sheet,
	update_character_api_was_called_with
} from "./utils/utils"

const VALUE = "the marvelous adventures of count von pumpkin"

describe("Journal Textbox should", () => {
	it("send a 'set_value|journal' action on change", async () => {
		await render_character_sheet()

		await click_menu_item(ACCORDION_ITEM.JOURNAL)
		await change_textbox_value("Journal", VALUE)

		await update_character_api_was_called_with([
			{ action: "set_value", property: "journal", value: VALUE }
		])
	})
})
