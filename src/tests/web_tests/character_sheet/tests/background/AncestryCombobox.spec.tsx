import {
	A_USER, ANOTHER_USER,
	change_combobox_item, given_your_email_is,
	render_character_sheet, then_textbox_has_a_value_of, then_textbox_is_disabled,
	update_character_api_was_called_with
} from "@tests/web_tests/character_sheet/utils/utils"
import {TEST_ANCESTRIES} from "../../utils/collections"

const CHARACTER_ANCESTRY = TEST_ANCESTRIES[1]
const NEW_CHARACTER_ANCESTRY = TEST_ANCESTRIES[2]
const CHARACTER_ANCESTRY_TRAIT = CHARACTER_ANCESTRY.traits[1]

describe("Ancestry Combobox should", () => {
	it("show character sheet ancestry value", async () => {
		await render_character_sheet({ancestry: CHARACTER_ANCESTRY.code})

		await then_textbox_has_a_value_of("Ancestry", CHARACTER_ANCESTRY.name)
	})

	it("send a 'set_value|ancestry' and show updated value on change", async () => {
		await render_character_sheet({ancestry: CHARACTER_ANCESTRY.code})

		await change_combobox_item("Ancestry", NEW_CHARACTER_ANCESTRY)

		await update_character_api_was_called_with([
			{
				action: "set_value",
				property: "ancestry_trait",
				value: null
			},
			{
				action: "set_value",
				property: "ancestry",
				value: NEW_CHARACTER_ANCESTRY.code
			}
		])
		await then_textbox_has_a_value_of("Ancestry", NEW_CHARACTER_ANCESTRY.name)
	})

	it("clear ancestry trait on change", async () => {
		await render_character_sheet({ancestry: CHARACTER_ANCESTRY.code, ancestry_trait: CHARACTER_ANCESTRY_TRAIT.code})

		await change_combobox_item("Ancestry", NEW_CHARACTER_ANCESTRY)

		await then_textbox_has_a_value_of("Ancestry Trait", "")
	})

	it("be disabled if it is not yours", async () => {
		await given_your_email_is(A_USER)
		await render_character_sheet({ancestry: CHARACTER_ANCESTRY.code, created_by: ANOTHER_USER})

		await then_textbox_is_disabled("Ancestry")
		await then_textbox_has_a_value_of("Ancestry", CHARACTER_ANCESTRY.name)
	})

	it("be blank by default", async () => {
		await render_character_sheet({})

		await then_textbox_has_a_value_of("Ancestry", "")
	})
})
