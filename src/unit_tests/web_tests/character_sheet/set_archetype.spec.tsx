import {
	change_combobox_item,
	render_character_sheet,
	update_character_api_was_called_with
} from "@tests/web_tests/character_sheet/utils/utils"
import { TEST_ARCHETYPES } from "./utils/collections"

const NEW_CHARACTER_ARCHETYPE = TEST_ARCHETYPES[2]

describe("Archetype Combobox should", () => {
	it("send a 'set_value|archetype' action on change", async () => {
		await render_character_sheet()

		await change_combobox_item("Archetype", NEW_CHARACTER_ARCHETYPE)

		await update_character_api_was_called_with([
			{
				action: "set_value",
				property: "archetype",
				value: NEW_CHARACTER_ARCHETYPE.code
			}
		])
	})
})
