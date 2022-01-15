import {
	change_textbox_value,
	render_character_sheet,
	update_character_api_was_called_with
} from "./utils/utils"

const NEW_CHARACTER_NAME = "linuar"

describe("Name Textbox should", () => {
	it("send a 'set_value|name' action on change", async () => {
		await render_character_sheet()

		await change_textbox_value("Name", NEW_CHARACTER_NAME)

		await update_character_api_was_called_with([
			{ action: "set_value", property: "name", value: NEW_CHARACTER_NAME }
		])
	})
})
