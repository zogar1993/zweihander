import { when_combobox_item_is_changed } from "@tests/web_tests/character_sheet/utils/combobox-helpers"
import { then_textbox_has_a_value_of } from "@tests/web_tests/character_sheet/utils/textbox-helpers"
import {
	render_character_sheet,
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

		await when_combobox_item_is_changed("Archetype", NEW_CHARACTER_ARCHETYPE)

		await update_character_api_was_called_with([
			{ action: "set_value", property: "archetype", value: NEW_CHARACTER_ARCHETYPE.code }
		])
		await then_textbox_has_a_value_of("Archetype", NEW_CHARACTER_ARCHETYPE.name)
	})

	it("send a 'set_value|archetype' and show updated value on change", async () => {
		await render_character_sheet({archetype: CHARACTER_ARCHETYPE.code})

		await when_combobox_item_is_changed("Archetype", NEW_CHARACTER_ARCHETYPE)

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
