import {
	then_number_input_has_a_value_of,
	then_spinbutton_is_disabled,
	when_spinbutton_value_is_changed
} from "@tests/web_tests/character_sheet/utils/spinbutton-helpers"
import {
	A_USER,
	ANOTHER_USER,
	given_your_email_is,
	render_character_sheet,
	update_character_api_was_called_with
} from "@tests/web_tests/character_sheet/utils/utils"

const CHARACTER_AGE = 24
const NEW_CHARACTER_AGE = 36

describe("Age Textbox should", () => {
	it("show character sheet age value", async () => {
		await render_character_sheet({age: CHARACTER_AGE})

		await then_number_input_has_a_value_of("Age", CHARACTER_AGE)
	})

	it("send a 'set_value|age' action and show updated value on change", async () => {
		await render_character_sheet({age: CHARACTER_AGE})

		await when_spinbutton_value_is_changed("Age", NEW_CHARACTER_AGE)

		await update_character_api_was_called_with([
			{ action: "set_value", property: "age", value: NEW_CHARACTER_AGE }
		])
		await then_number_input_has_a_value_of("Age", NEW_CHARACTER_AGE)
	})

	it("be disabled if it is not yours", async () => {
		await given_your_email_is(A_USER)
		await render_character_sheet({age: CHARACTER_AGE, created_by: ANOTHER_USER})

		await then_spinbutton_is_disabled("Age")
		await then_number_input_has_a_value_of("Age", CHARACTER_AGE)
	})

	it("be 0 by default", async () => {
		await render_character_sheet({})

		await then_number_input_has_a_value_of("Age", 0)
	})
})
