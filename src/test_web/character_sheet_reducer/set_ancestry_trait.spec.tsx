import { TEST_ANCESTRIES } from "./utils/collections"
import {
	render_character_sheet_page_after_loading,
	select_combobox_item,
	update_character_api_was_called_with
} from "./utils/utils"

const ANCESTRY = TEST_ANCESTRIES[2]
const NEW_CHARACTER_ANCESTRY_TRAIT = ANCESTRY.traits[2]

describe("Ancestry Trait Combobox should", () => {
	it("send a 'set_value|ancestry_trait' action on change", async () => {
		await render_character_sheet_page_after_loading({ ancestry: ANCESTRY.code })

		await select_combobox_item("Ancestry Trait", NEW_CHARACTER_ANCESTRY_TRAIT)

		await update_character_api_was_called_with([
			{
				action: "set_value",
				property: "ancestry_trait",
				value: NEW_CHARACTER_ANCESTRY_TRAIT.code
			}
		])
	})
})