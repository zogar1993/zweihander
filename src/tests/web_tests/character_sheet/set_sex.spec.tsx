import {
	change_combobox_item,
	render_character_sheet,
	update_character_api_was_called_with
} from "@tests/web_tests/character_sheet/utils/utils"

const NEW_CHARACTER_SEX = { name: "Female", code: "female" }

describe("Sex Combobox should", () => {
	it("send a 'set_value|sex' action on change", async () => {
		await render_character_sheet()

		await change_combobox_item("Sex", NEW_CHARACTER_SEX)

		await update_character_api_was_called_with([
			{ action: "set_value", property: "sex", value: NEW_CHARACTER_SEX.code }
		])
	})
})
