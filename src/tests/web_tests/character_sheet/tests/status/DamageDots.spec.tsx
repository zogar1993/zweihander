import {
	A_USER,
	ANOTHER_USER,
	click_radiobutton,
	given_your_email_is,
	render_character_sheet,
	then_radio_is_checked,
	then_radio_is_disabled,
	update_character_api_was_called_with
} from "@tests/web_tests/character_sheet/utils/utils"
import { DAMAGE_CONDITIONS } from "@web/components/character_sheet/bio/Constants"

const VALUE = DAMAGE_CONDITIONS[1]
const NEW_VALUE = DAMAGE_CONDITIONS[2]

describe("Damage Condition Combobox should", () => {
	it("show character sheet order_ranks value", async () => {
		await render_character_sheet({damage: VALUE.code})

		await then_radio_is_checked(VALUE.name)
	})
	
	it("send a 'set_value|damage' and show updated value on change", async () => {
		await render_character_sheet({damage: VALUE.code})

		await click_radiobutton(NEW_VALUE.name)

		await update_character_api_was_called_with([
			{
				action: "set_value",
				property: "damage",
				value: NEW_VALUE.code
			}
		])
		await then_radio_is_checked(NEW_VALUE.name)
	})

	it("be disabled if it is not yours", async () => {
		await given_your_email_is(A_USER)
		await render_character_sheet({damage: VALUE.code, created_by: ANOTHER_USER})

		await then_radio_is_disabled(VALUE.name)
		await then_radio_is_checked(VALUE.name)
	})


	it("be blank by default", async () => {
		await render_character_sheet({})

		await then_radio_is_checked(DAMAGE_CONDITIONS[0].name)
	})
})
