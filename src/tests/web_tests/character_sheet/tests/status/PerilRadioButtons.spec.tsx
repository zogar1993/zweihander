import {
	A_USER,
	ANOTHER_USER,
	click_radiobutton,
	given_your_email_is,
	render_character_sheet,
	then_dots_are_disabled,
	then_dots_is_checked_on,
	then_radio_is_checked,
	then_radio_is_disabled,
	update_character_api_was_called_with
} from "@tests/web_tests/character_sheet/utils/utils"
import { PERIL_CONDITIONS } from "@web/components/character_sheet/bio/Constants"

const VALUE = PERIL_CONDITIONS[1]
const NEW_VALUE = PERIL_CONDITIONS[2]

describe("Peril Condition RadioButton should", () => {
	it("show character sheet order_ranks value", async () => {
		await render_character_sheet({peril: VALUE.code})

		await then_radio_is_checked(VALUE.name)
	})

	it("send a 'set_value|peril' and show updated value on change", async () => {
		await render_character_sheet({peril: VALUE.code})

		await click_radiobutton(NEW_VALUE.name)

		await update_character_api_was_called_with([
			{
				action: "set_value",
				property: "peril",
				value: NEW_VALUE.code
			}
		])
		await then_radio_is_checked(NEW_VALUE.name)
	})

	it("be disabled if it is not yours", async () => {
		await given_your_email_is(A_USER)
		await render_character_sheet({peril: VALUE.code, created_by: ANOTHER_USER})

		await then_radio_is_disabled(VALUE.name)
		await then_radio_is_checked(VALUE.name)
	})


	it("be blank by default", async () => {
		await render_character_sheet({})

		await then_radio_is_checked(PERIL_CONDITIONS[0].name)
	})
})
