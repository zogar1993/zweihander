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
import { UPBRINGINGS } from "@web/components/character_sheet/bio/Constants"

const CHARACTER_UPBRINGING = UPBRINGINGS[1]
const NEW_CHARACTER_UPBRINGING = UPBRINGINGS[2]

describe("Upbringing Combobox should", () => {
	it("show character sheet upbringing value", async () => {
		await render_character_sheet({upbringing: CHARACTER_UPBRINGING.code})

		await then_textbox_has_a_value_of("Upbringing", CHARACTER_UPBRINGING.name)
	})
	
	it("send a 'set_value|upbringing' and show updated value on change", async () => {
		await render_character_sheet({upbringing: CHARACTER_UPBRINGING.code})

		await when_combobox_item_is_changed("Upbringing", NEW_CHARACTER_UPBRINGING)

		await update_character_api_was_called_with([
			{
				action: "set_value",
				property: "upbringing",
				value: NEW_CHARACTER_UPBRINGING.code
			}
		])
		await then_textbox_has_a_value_of("Upbringing", NEW_CHARACTER_UPBRINGING.name)
	})

	it("be disabled if it is not yours", async () => {
		await given_your_email_is(A_USER)
		await render_character_sheet({upbringing: CHARACTER_UPBRINGING.code, created_by: ANOTHER_USER})

		await then_textbox_is_disabled("Upbringing")
		await then_textbox_has_a_value_of("Upbringing", CHARACTER_UPBRINGING.name)
	})


	it("be blank by default", async () => {
		await render_character_sheet({})

		await then_textbox_has_a_value_of("Upbringing", "")
	})
})
