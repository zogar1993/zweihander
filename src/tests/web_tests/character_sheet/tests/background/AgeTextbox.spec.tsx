import {
	ANOTHER_USER,
	change_number_input_value,
	render_character_sheet, then_number_input_has_a_value_of, then_number_input_is_disabled,
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

		await change_number_input_value("Age", NEW_CHARACTER_AGE)

		await update_character_api_was_called_with([
			{ action: "set_value", property: "age", value: NEW_CHARACTER_AGE }
		])
	})

	it("be disabled if it is not yours", async () => {
		await render_character_sheet({age: CHARACTER_AGE}, {email: ANOTHER_USER})

		await character_sheet_finished_loading()

		await then_number_input_is_disabled("Age")
	})

	it("be 0 by default", async () => {
		await render_character_sheet({})

		await then_number_input_has_a_value_of("Age", 0)
	})
})
