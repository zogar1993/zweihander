import {
	change_combobox_item,
	render_character_sheet,
	update_character_api_was_called_with
} from "@tests/web_tests/character_sheet/utils/utils"
import { DAMAGE_CONDITIONS } from "@web/components/character_sheet/bio/Constants"

const VALUE = DAMAGE_CONDITIONS[1]

describe("Damage Condition Combobox should", () => {
	it("send a 'set_value|damage' action on change", async () => {
		await render_character_sheet()

		await change_combobox_item("Damage Condition", VALUE)

		await update_character_api_was_called_with([
			{
				action: "set_value",
				property: "damage",
				value: VALUE.code
			}
		])
	})
})
