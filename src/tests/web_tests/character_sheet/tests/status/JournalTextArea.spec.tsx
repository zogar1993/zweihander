import {
	then_textbox_has_a_value_of,
	then_textbox_is_disabled,
	when_textbox_value_is_changed
} from "@tests/web_tests/character_sheet/utils/textbox-helpers"
import {
	A_USER,
	ANOTHER_USER,
	click_menu_item,
	given_your_email_is,
	render_character_sheet,
	update_character_api_was_called_with
} from "@tests/web_tests/character_sheet/utils/utils"
import { ACCORDION_ITEM } from "@web/constants/ACCORDION_ITEM"

const VALUE = "the marvelous adventures of count von pumpkin"
const NEW_VALUE = "the marvelous adventures of count pumpkin-man"

describe("Journal Textbox should", () => {
	it("show character sheet journal value", async () => {
		await render_character_sheet({journal: VALUE})
		await click_menu_item(ACCORDION_ITEM.JOURNAL)

		await then_textbox_has_a_value_of("Journal", VALUE)
	})

	it("send a 'set_value|journal' and show updated value on change", async () => {
	await render_character_sheet({journal: VALUE})
		await click_menu_item(ACCORDION_ITEM.JOURNAL)

		await when_textbox_value_is_changed("Journal", NEW_VALUE)

		await update_character_api_was_called_with([
			{ action: "set_value", property: "journal", value: NEW_VALUE }
		])
		await then_textbox_has_a_value_of("Journal", NEW_VALUE)
	})

	it("be disabled if it is not yours", async () => {
		await given_your_email_is(A_USER)
		await render_character_sheet({journal: VALUE, created_by: ANOTHER_USER})
		await click_menu_item(ACCORDION_ITEM.JOURNAL)

		await then_textbox_is_disabled("Journal")
		await then_textbox_has_a_value_of("Journal", VALUE)
	})


	it("be blank by default", async () => {
		await render_character_sheet({})
		await click_menu_item(ACCORDION_ITEM.JOURNAL)

		await then_textbox_has_a_value_of("Journal", "")
	})
})
