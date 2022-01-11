import { UPBRINGINGS } from "@web/components/character_sheet/bio/Constants"
import {
	render_character_sheet_page_after_loading,
	select_combobox_item,
	update_character_api_was_called_with
} from "./utils/utils"

const NEW_CHARACTER_UPBRINGING = UPBRINGINGS[2]

describe("Upbringing Combobox should", () => {
	it("send a 'set_value|sex' action on change", async () => {
		await render_character_sheet_page_after_loading()

		await select_combobox_item("Upbringing", NEW_CHARACTER_UPBRINGING)

		await update_character_api_was_called_with([
			{
				action: "set_value",
				property: "upbringing",
				value: NEW_CHARACTER_UPBRINGING.code
			}
		])
	})
})
