import {
	change_number_input_value,
	render_character_sheet,
	update_character_api_was_called_with
} from "./utils/utils"

const NEW_CHARACTER_AGE = 36

describe("Age Textbox should", () => {
	it("send a 'set_value|age' action on change", async () => {
		await render_character_sheet()

		await change_number_input_value("Age", NEW_CHARACTER_AGE)

		await update_character_api_was_called_with([
			{ action: "set_value", property: "age", value: NEW_CHARACTER_AGE }
		])
	})
})
