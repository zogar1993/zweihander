import {
	when_spinbutton_value_is_changed,
	then_number_input_has_a_value_of,
	then_spinbutton_is_disabled
} from "@tests/web_tests/character_sheet/utils/spinbutton-helpers"
import {
	A_USER,
	ANOTHER_USER,
	given_your_email_is,
	render_character_sheet,
	update_character_api_was_called_with
} from "@tests/web_tests/character_sheet/utils/utils"

const CHARACTER_CORRUPTION = 4
const NEW_CHARACTER_CORRUPTION = 6

describe("Corruption Textbox should", () => {
	it("show character sheet corruption value", async () => {
		await render_character_sheet({corruption: CHARACTER_CORRUPTION})

		await then_number_input_has_a_value_of("Corruption", CHARACTER_CORRUPTION)
	})
	
	it("send a 'set_value|corruption' and show updated value on change", async () => {
		await render_character_sheet()

		await when_spinbutton_value_is_changed("Corruption", NEW_CHARACTER_CORRUPTION)

		await update_character_api_was_called_with([
			{
				action: "set_value",
				property: "corruption",
				value: NEW_CHARACTER_CORRUPTION
			}
		])
		await then_number_input_has_a_value_of("Corruption", NEW_CHARACTER_CORRUPTION)
	})

	it("be disabled if it is not yours", async () => {
		await given_your_email_is(A_USER)
		await render_character_sheet({corruption: CHARACTER_CORRUPTION, created_by: ANOTHER_USER})

		await then_spinbutton_is_disabled("Corruption")
		await then_number_input_has_a_value_of("Corruption", CHARACTER_CORRUPTION)
	})

	it("be 0 by default", async () => {
		await render_character_sheet({})

		await then_number_input_has_a_value_of("Corruption", 0)
	})
})
