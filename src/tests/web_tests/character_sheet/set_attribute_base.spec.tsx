import { ATTRIBUTE_DEFINITIONS } from "@core/domain/attribute/ATTRIBUTE_DEFINITIONS"
import {
	change_number_input_value,
	render_character_sheet,
	update_character_api_was_called_with
} from "@tests/web_tests/character_sheet/utils/utils"

const NEW_ATTRIBUTE_BASE = 48
const ATTRIBUTE = ATTRIBUTE_DEFINITIONS[2]

describe("Attribute Base Textbox should", () => {
	it("send a 'set_value|attributes.{code}.base' action on change", async () => {
		await render_character_sheet()

		await change_number_input_value(
			`${ATTRIBUTE.name} Base`,
			NEW_ATTRIBUTE_BASE
		)

		await update_character_api_was_called_with([
			{
				action: "set_value",
				property: `attributes.${ATTRIBUTE.code}.base`,
				value: NEW_ATTRIBUTE_BASE
			}
		])
	})
})
