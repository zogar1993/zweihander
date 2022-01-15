import { TEST_ARCHETYPES } from "./utils/collections"
import {
	render_character_sheet,
	select_combobox_item,
	update_character_api_was_called_with
} from "./utils/utils"

const NEW_CHARACTER_ARCHETYPE = TEST_ARCHETYPES[2]

describe("Archetype Combobox should", () => {
	it("send a 'set_value|archetype' action on change", async () => {
		await render_character_sheet()

		await select_combobox_item("Archetype", NEW_CHARACTER_ARCHETYPE)

		await update_character_api_was_called_with([
			{
				action: "set_value",
				property: "archetype",
				value: NEW_CHARACTER_ARCHETYPE.code
			}
		])
	})
})
