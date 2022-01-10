import {
	render_character_sheet_page_after_loading,
	select_combobox_item,
	update_character_api_was_called_with
} from "./utils/utils"

const NEW_CHARACTER_SEX = { name: "Female", code: "female" }

describe("Name Textbox should", () => {
	it("send a 'set_value|sex' action on change", async () => {
		await render_character_sheet_page_after_loading()

		await select_combobox_item("Sex", NEW_CHARACTER_SEX)

		await update_character_api_was_called_with([
			{ action: "set_value", property: "sex", value: NEW_CHARACTER_SEX.code }
		])
	})
})
