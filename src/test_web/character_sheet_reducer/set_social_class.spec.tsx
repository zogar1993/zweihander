import { SOCIAL_CLASSES } from "@web/components/character_sheet/bio/Constants"
import {
	render_character_sheet_page,
	select_combobox_item,
	update_character_api_was_called_with
} from "./utils/utils"

const NEW_SOCIAL_CLASS = SOCIAL_CLASSES[2]

describe("Social Class Combobox should", () => {
	it("send a 'set_value|social_class' action on change", async () => {
		await render_character_sheet_page()

		await select_combobox_item("Social Class", NEW_SOCIAL_CLASS)

		await update_character_api_was_called_with([
			{
				action: "set_value",
				property: "social_class",
				value: NEW_SOCIAL_CLASS.code
			}
		])
	})
})
