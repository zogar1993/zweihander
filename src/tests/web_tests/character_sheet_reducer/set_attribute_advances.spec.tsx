import { ATTRIBUTE_DEFINITIONS } from "@core/domain/attribute/ATTRIBUTE_DEFINITIONS"
import {
	render_character_sheet,
	select_dots_value,
	update_character_api_was_called_with
} from "./utils/utils"

const NEW_ATTRIBUTE_ADVANCES = 2
const ATTRIBUTE = ATTRIBUTE_DEFINITIONS[2]

describe("Attribute Advances Dots should", () => {
	it("send a 'set_value|attributes.{code}.advances' action on change", async () => {
		await render_character_sheet()

		await select_dots_value(
			`${ATTRIBUTE.name} Advances`,
			NEW_ATTRIBUTE_ADVANCES
		)

		await update_character_api_was_called_with([
			{
				action: "set_value",
				property: `attributes.${ATTRIBUTE.code}.advances`,
				value: NEW_ATTRIBUTE_ADVANCES
			}
		])
	})
})
