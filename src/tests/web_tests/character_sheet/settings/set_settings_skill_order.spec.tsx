import {
	change_combobox_item,
	click_menu_item,
	render_character_sheet,
	update_character_api_was_called_with
} from "@tests/web_tests/character_sheet/utils/utils"
import { SETTINGS_SKILL_ORDER } from "@web/components/character_sheet/bio/Constants"
import { ACCORDION_ITEM } from "@web/constants/ACCORDION_ITEM"

const VALUE = SETTINGS_SKILL_ORDER[1]

describe("Skill Order Combobox should", () => {
	it("send a 'set_value|settings.skill_order' action on change", async () => {
		await render_character_sheet()

		await click_menu_item(ACCORDION_ITEM.SETTINGS)
		await change_combobox_item("Skill Order", VALUE)

		await update_character_api_was_called_with([
			{
				action: "set_value",
				property: "settings.skill_order",
				value: VALUE.code
			}
		])
	})
})
