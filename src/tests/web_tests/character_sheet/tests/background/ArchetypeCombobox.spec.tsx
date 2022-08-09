import {
	change_combobox_item,
	render_character_sheet,
	then_textbox_has_a_value_of,
	update_character_api_was_called_with
} from "@tests/web_tests/character_sheet/utils/utils"
import { TEST_ARCHETYPES } from "../../utils/collections"

const CHARACTER_ARCHETYPE = TEST_ARCHETYPES[1]
const NEW_CHARACTER_ARCHETYPE = TEST_ARCHETYPES[2]

describe("Archetype Combobox should", () => {
	it("show character sheet archetype value", async () => {
		await render_character_sheet({archetype: CHARACTER_ARCHETYPE.code})

		await then_textbox_has_a_value_of("Archetype", CHARACTER_ARCHETYPE.name)
	})

	it("send a 'set_value|archetype' action and show updated value on change", async () => {
		await render_character_sheet({archetype: CHARACTER_ARCHETYPE.code})

		await change_combobox_item("Archetype", NEW_CHARACTER_ARCHETYPE)

		await update_character_api_was_called_with([
			{ action: "set_value", property: "archetype", value: NEW_CHARACTER_ARCHETYPE.code }
		])
		await then_textbox_has_a_value_of("Archetype", NEW_CHARACTER_ARCHETYPE.name)
	})

	it("send a 'set_value|archetype' and show updated value on change", async () => {
		await render_character_sheet({archetype: CHARACTER_ARCHETYPE.code})

		await change_combobox_item("Archetype", NEW_CHARACTER_ARCHETYPE)

		await update_character_api_was_called_with([
			{
				action: "set_value",
				property: "archetype",
				value: NEW_CHARACTER_ARCHETYPE.code
			}
		])
		await then_textbox_has_a_value_of("Archetype", NEW_CHARACTER_ARCHETYPE.name)
	})


	it("be blank by default", async () => {
		await render_character_sheet({})

		await then_textbox_has_a_value_of("Archetype", "")
	})
})
