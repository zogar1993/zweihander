import { TEST_ANCESTRIES } from "./utils/collections"
import {
	render_character_sheet_page_after_loading,
	select_combobox_item,
	update_character_api_was_called_with
} from "./utils/utils"

const NEW_CHARACTER_ANCESTRY = TEST_ANCESTRIES[2]

describe("Ancestry Combobox should", () => {
	it("send a 'set_value|ancestry' action on change", async () => {
		await render_character_sheet_page_after_loading()

		await select_combobox_item("Ancestry", NEW_CHARACTER_ANCESTRY)

		await update_character_api_was_called_with([
			{
				action: "set_value",
				property: "ancestry",
				value: NEW_CHARACTER_ANCESTRY.code
			}
		])
	})
})
