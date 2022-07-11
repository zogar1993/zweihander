import {
	change_combobox_item,
	render_character_sheet,
	update_character_api_was_called_with
} from "@tests/web_tests/character_sheet/utils/utils"
import { UPBRINGINGS } from "@web/components/character_sheet/bio/Constants"

const NEW_CHARACTER_UPBRINGING = UPBRINGINGS[2]

describe("Upbringing Combobox should", () => {
	it("send a 'set_value|sex' action on change", async () => {
		await render_character_sheet()

		await change_combobox_item("Upbringing", NEW_CHARACTER_UPBRINGING)

		await update_character_api_was_called_with([
			{
				action: "set_value",
				property: "upbringing",
				value: NEW_CHARACTER_UPBRINGING.code
			}
		])
	})
})
