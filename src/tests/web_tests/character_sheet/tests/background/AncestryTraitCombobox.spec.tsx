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
import { TEST_ANCESTRIES } from "../../utils/collections"

const ANCESTRY = TEST_ANCESTRIES[1]
const CHARACTER_ANCESTRY_TRAIT = ANCESTRY.traits[1]
const NEW_CHARACTER_ANCESTRY_TRAIT = ANCESTRY.traits[2]

describe("Ancestry Trait Combobox should", () => {
	it("show character sheet ancestry_trait value", async () => {
		await render_character_sheet({ancestry: ANCESTRY.code, ancestry_trait: CHARACTER_ANCESTRY_TRAIT.code})

		await then_textbox_has_a_value_of("Ancestry Trait", CHARACTER_ANCESTRY_TRAIT.name)
	})

	it("send a 'set_value|ancestry_trait' and show updated value on change", async () => {
		await render_character_sheet({ancestry: ANCESTRY.code, ancestry_trait: CHARACTER_ANCESTRY_TRAIT.code})

		await when_combobox_item_is_changed("Ancestry Trait", NEW_CHARACTER_ANCESTRY_TRAIT)

		await update_character_api_was_called_with([
			{
				action: "set_value",
				property: "ancestry_trait",
				value: NEW_CHARACTER_ANCESTRY_TRAIT.code
			}
		])
		await then_textbox_has_a_value_of("Ancestry Trait", NEW_CHARACTER_ANCESTRY_TRAIT.name)
	})

	it("be disabled if it is not yours", async () => {
		await given_your_email_is(A_USER)
		await render_character_sheet({
			ancestry: ANCESTRY.code,
			ancestry_trait: CHARACTER_ANCESTRY_TRAIT.code,
			created_by: ANOTHER_USER
		})

		await then_textbox_is_disabled("Ancestry Trait")
		await then_textbox_has_a_value_of("Ancestry Trait", CHARACTER_ANCESTRY_TRAIT.name)
	})

	it("be disabled if you have no ancestry", async () => {
		await render_character_sheet({ancestry: null})

		await then_textbox_is_disabled("Ancestry Trait")
	})


	it("be blank by default", async () => {
		await render_character_sheet({})

		await then_textbox_has_a_value_of("Ancestry Trait", "")
	})
})
