import {
	change_combobox_item,
	render_character_sheet,
	update_character_api_was_called_with
} from "@tests/web_tests/character_sheet/utils/utils"
import { TEST_ANCESTRIES } from "../utils/collections"

const NEW_CHARACTER_ANCESTRY = TEST_ANCESTRIES[2]

describe("Ancestry Combobox should", () => {
	it("send a 'set_value|ancestry' action on change", async () => {
		await render_character_sheet()

		await change_combobox_item("Ancestry", NEW_CHARACTER_ANCESTRY)

		await update_character_api_was_called_with([
			{
				action: "set_value",
				property: "ancestry_trait",
				value: null
			},
			{
				action: "set_value",
				property: "ancestry",
				value: NEW_CHARACTER_ANCESTRY.code
			}
		])
	})
})
