import { when_combobox_item_is_changed } from "@tests/web_tests/character_sheet/utils/combobox-helpers"
import {
	then_textbox_has_a_value_of,
	then_textbox_is_disabled
} from "@tests/web_tests/character_sheet/utils/textbox-helpers"
import {
	A_USER,
	ANOTHER_USER,
	given_your_email_is,
	render_character_sheet,
	update_character_api_was_called_with
} from "@tests/web_tests/character_sheet/utils/utils"

const CHARACTER_SEX = { name: "Male", code: "male" }
const NEW_CHARACTER_SEX = { name: "Female", code: "female" }

describe("Sex Combobox should", () => {
	it("show character sheet sex value", async () => {
		await render_character_sheet({sex: CHARACTER_SEX.code})

		await then_textbox_has_a_value_of("Sex", CHARACTER_SEX.name)
	})

	it("send a 'set_value|sex' action and show updated value on change", async () => {
		await render_character_sheet()

		await when_combobox_item_is_changed("Sex", NEW_CHARACTER_SEX)

		await update_character_api_was_called_with([
			{ action: "set_value", property: "sex", value: NEW_CHARACTER_SEX.code }
		])
		await then_textbox_has_a_value_of("Sex", NEW_CHARACTER_SEX.name)
	})

	it("be disabled if it is not yours", async () => {
		await given_your_email_is(A_USER)
		await render_character_sheet({sex: CHARACTER_SEX.code, created_by: ANOTHER_USER})

		await then_textbox_is_disabled("Sex")
		await then_textbox_has_a_value_of("Sex", CHARACTER_SEX.name)
	})


	it("be blank by default", async () => {
		await render_character_sheet({})

		await then_textbox_has_a_value_of("Sex", "")
	})
})