import {
	change_combobox_item,
	render_character_sheet,
	update_character_api_was_called_with
} from "@tests/web_tests/character_sheet/utils/utils"
import { PERIL_CONDITIONS } from "@web/components/character_sheet/bio/Constants"

const VALUE = PERIL_CONDITIONS[1]

describe("Peril Condition Combobox should", () => {
	it("send a 'set_value|peril' action on change", async () => {
		await render_character_sheet()

		await change_combobox_item("Peril Condition", VALUE)

		await update_character_api_was_called_with([
			{
				action: "set_value",
				property: "peril",
				value: VALUE.code
			}
		])
	})
})
