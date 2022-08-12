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
import { TEST_CHAOS_ALIGNMENTS } from "../../utils/collections"

const ALIGNMENT = TEST_CHAOS_ALIGNMENTS[1]
const NEW_ALIGNMENT = TEST_CHAOS_ALIGNMENTS[2]

describe("Chaos Alignment Combobox should", () => {
	it("show character sheet alignment value", async () => {
		await render_character_sheet({chaos_alignment: ALIGNMENT.code})

		await then_textbox_has_a_value_of("Chaos Alignment", ALIGNMENT.name)
	})

	it("send a 'set_value|chaos_alignment' and show updated value on change", async () => {
		await render_character_sheet({chaos_alignment: ALIGNMENT.code})

		await when_combobox_item_is_changed("Chaos Alignment", NEW_ALIGNMENT)

		await update_character_api_was_called_with([
			{
				action: "set_value",
				property: "chaos_alignment",
				value: NEW_ALIGNMENT.code
			}
		])
		await then_textbox_has_a_value_of("Chaos Alignment", NEW_ALIGNMENT.name)
	})

	it("be disabled if it is not yours", async () => {
		await given_your_email_is(A_USER)
		await render_character_sheet({chaos_alignment: ALIGNMENT.code, created_by: ANOTHER_USER})

		await then_textbox_is_disabled("Chaos Alignment")
		await then_textbox_has_a_value_of("Chaos Alignment", ALIGNMENT.name)
	})


	it("be blank by default", async () => {
		await render_character_sheet({})

		await then_textbox_has_a_value_of("Chaos Alignment", "")
	})
})
