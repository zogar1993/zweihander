import {
	A_USER,
	ANOTHER_USER,
	change_textbox_value,
	given_your_email_is,
	render_character_sheet,
	then_textbox_has_a_value_of,
	then_textbox_is_disabled,
	update_character_api_was_called_with
} from "@tests/web_tests/character_sheet/utils/utils"

const CHARACTER_NAME = "ragoz"
const NEW_CHARACTER_NAME = "linuar"

describe("Name Textbox should", () => {
	it("show character sheet name value", async () => {
		await render_character_sheet({name: CHARACTER_NAME})

		await then_textbox_has_a_value_of("Name", CHARACTER_NAME)
	})

	it("send a 'set_value|name' action on change", async () => {
		await render_character_sheet()

		await change_textbox_value("Name", NEW_CHARACTER_NAME)

		await update_character_api_was_called_with([
			{ action: "set_value", property: "name", value: NEW_CHARACTER_NAME }
		])
	})

	it("be disabled if it is not yours", async () => {
		await given_your_email_is(A_USER)
		await render_character_sheet({name: CHARACTER_NAME, created_by: ANOTHER_USER})

		await then_textbox_is_disabled("Name")
	})


	it("be blank by default", async () => {
		await render_character_sheet({})

		await then_textbox_has_a_value_of("Name", "")
	})
})
