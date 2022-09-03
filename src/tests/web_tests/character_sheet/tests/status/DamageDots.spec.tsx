import {
	then_radiobutton_is_checked,
	then_radiobutton_is_disabled,
	when_radiobutton_is_clicked
} from "@tests/web_tests/character_sheet/utils/radiobutton-helpers"
import {
	A_USER,
	ANOTHER_USER,
	given_your_email_is,
	render_character_sheet,
	update_character_api_was_called_with
} from "@tests/web_tests/character_sheet/utils/utils"
import { DAMAGE_CONDITIONS } from "@web/components/character_sheet/bio/Constants"

const VALUE = DAMAGE_CONDITIONS[1]
const NEW_VALUE = DAMAGE_CONDITIONS[2]

describe("Damage Condition Combobox should", () => {
	it("show character sheet order_ranks value", async () => {
		await render_character_sheet({damage: VALUE.code})

		await then_radiobutton_is_checked(VALUE.name)
	})
	
	it("send a 'set_value|damage' and show updated value on change", async () => {
		await render_character_sheet({damage: VALUE.code})

		await when_radiobutton_is_clicked(NEW_VALUE.name)

		await update_character_api_was_called_with([
			{
				action: "set_value",
				property: "damage",
				value: NEW_VALUE.code
			}
		])
		await then_radiobutton_is_checked(NEW_VALUE.name)
	})

	it("be disabled if it is not yours", async () => {
		await given_your_email_is(A_USER)
		await render_character_sheet({damage: VALUE.code, created_by: ANOTHER_USER})

		await then_radiobutton_is_disabled(VALUE.name)
		await then_radiobutton_is_checked(VALUE.name)
	})


	it("be blank by default", async () => {
		await render_character_sheet({})

		await then_radiobutton_is_checked(DAMAGE_CONDITIONS[0].name)
	})
})
