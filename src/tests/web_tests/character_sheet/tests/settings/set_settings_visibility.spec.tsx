import { when_combobox_item_is_changed } from "@tests/web_tests/character_sheet/utils/combobox-helpers"
import {
	click_menu_item,
	render_character_sheet,
	update_character_api_was_called_with
} from "@tests/web_tests/character_sheet/utils/utils"
import { SETTINGS_VISIBILITY } from "@web/components/character_sheet/bio/Constants"
import { ACCORDION_ITEM } from "@web/constants/ACCORDION_ITEM"

const VALUE = SETTINGS_VISIBILITY[1]

describe("Visibility Combobox should", () => {
	it("send a 'set_value|settings.visibility' action on change", async () => {
		await render_character_sheet()

		await click_menu_item(ACCORDION_ITEM.SETTINGS)
		await when_combobox_item_is_changed("Visibility", VALUE)

		await update_character_api_was_called_with([
			{
				action: "set_value",
				property: "settings.visibility",
				value: VALUE.code
			}
		])
	})
})
