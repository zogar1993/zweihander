import { ACCORDION_ITEM } from "@web/constants/ACCORDION_ITEM"
import {
	change_number_input_value,
	click_menu_item,
	render_character_sheet,
	update_character_api_was_called_with
} from "./utils/utils"

const NEW_CHARACTER_CORRUPTION = 6

describe("Corruption Textbox should", () => {
	it("send a 'set_value|corruption' action on change", async () => {
		await render_character_sheet()

		await click_menu_item(ACCORDION_ITEM.ALIGNMENT)
		await change_number_input_value("Corruption", NEW_CHARACTER_CORRUPTION)

		await update_character_api_was_called_with([
			{
				action: "set_value",
				property: "corruption",
				value: NEW_CHARACTER_CORRUPTION
			}
		])
	})
})
