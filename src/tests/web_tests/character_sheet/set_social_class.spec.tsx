import {
	change_combobox_item,
	render_character_sheet,
	update_character_api_was_called_with
} from "@tests/web_tests/character_sheet/utils/utils"
import { SOCIAL_CLASSES } from "@web/components/character_sheet/bio/Constants"

const NEW_SOCIAL_CLASS = SOCIAL_CLASSES[2]

describe("Social Class Combobox should", () => {
	it("send a 'set_value|social_class' action on change", async () => {
		await render_character_sheet()

		await change_combobox_item("Social Class", NEW_SOCIAL_CLASS)

		await update_character_api_was_called_with([
			{
				action: "set_value",
				property: "social_class",
				value: NEW_SOCIAL_CLASS.code
			}
		])
	})
})
