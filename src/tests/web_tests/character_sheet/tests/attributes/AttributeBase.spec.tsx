import { ATTRIBUTE_DEFINITIONS } from "@core/domain/attribute/ATTRIBUTE_DEFINITIONS"
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

const ATTRIBUTE_BASE = 38
const NEW_ATTRIBUTE_BASE = 48
const ATTRIBUTE = ATTRIBUTE_DEFINITIONS[2]

describe("Attribute Base Textbox should", () => {
	it("show character sheet attributes.{code}.base value", async () => {
		await render_character_sheet({attributes: {[ATTRIBUTE.code]: {base: ATTRIBUTE_BASE}}})

		await then_number_input_has_a_value_of(`${ATTRIBUTE.name} Base`, ATTRIBUTE_BASE)
	})

	it("send a 'set_value|attributes.{code}.base' and show updated value on change", async () => {
		await render_character_sheet({attributes: {[ATTRIBUTE.code]: {base: ATTRIBUTE_BASE}}})

		await when_spinbutton_value_is_changed(`${ATTRIBUTE.name} Base`, NEW_ATTRIBUTE_BASE)

		await update_character_api_was_called_with([
			{
				action: "set_value",
				property: `attributes.${ATTRIBUTE.code}.base`,
				value: NEW_ATTRIBUTE_BASE
			}
		])
		await then_number_input_has_a_value_of(`${ATTRIBUTE.name} Base`, NEW_ATTRIBUTE_BASE)
	})

	it("be disabled if it is not yours", async () => {
		await given_your_email_is(A_USER)
		await render_character_sheet({
			attributes: {[ATTRIBUTE.code]: {base: ATTRIBUTE_BASE}},
			created_by: ANOTHER_USER
		})

		await then_spinbutton_is_disabled(`${ATTRIBUTE.name} Base`)
		await then_number_input_has_a_value_of(`${ATTRIBUTE.name} Base`, ATTRIBUTE_BASE)
	})


	it("be blank by default", async () => {
		await render_character_sheet({})

		await then_number_input_has_a_value_of(`${ATTRIBUTE.name} Base`, 42)
	})
})
