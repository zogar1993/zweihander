import {
	A_USER, ANOTHER_USER,
	change_combobox_item, given_your_email_is,
	render_character_sheet, then_textbox_has_a_value_of, then_textbox_is_disabled,
	update_character_api_was_called_with
} from "@tests/web_tests/character_sheet/utils/utils"
import { SOCIAL_CLASSES } from "@web/components/character_sheet/bio/Constants"

const SOCIAL_CLASS = SOCIAL_CLASSES[1]
const NEW_SOCIAL_CLASS = SOCIAL_CLASSES[2]

describe("Social Class Combobox should", () => {
	it("show character sheet social_class value", async () => {
		await render_character_sheet({social_class: SOCIAL_CLASS.code})

		await then_textbox_has_a_value_of("Social Class", SOCIAL_CLASS.name)
	})
	
	it("send a 'set_value|social_class' and show updated value on change", async () => {
		await render_character_sheet({social_class: SOCIAL_CLASS.code})

		await change_combobox_item("Social Class", NEW_SOCIAL_CLASS)

		await update_character_api_was_called_with([
			{
				action: "set_value",
				property: "social_class",
				value: NEW_SOCIAL_CLASS.code
			}
		])
		await then_textbox_has_a_value_of("Social Class", NEW_SOCIAL_CLASS.name)
	})

	it("be disabled if it is not yours", async () => {
		await given_your_email_is(A_USER)
		await render_character_sheet({social_class: SOCIAL_CLASS.code, created_by: ANOTHER_USER})

		await then_textbox_is_disabled("Social Class")
		await then_textbox_has_a_value_of("Social Class", SOCIAL_CLASS.name)
	})


	it("be blank by default", async () => {
		await render_character_sheet({})

		await then_textbox_has_a_value_of("Social Class", "")
	})
})
