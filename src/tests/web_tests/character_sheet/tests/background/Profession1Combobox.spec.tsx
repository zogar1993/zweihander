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
import { TEST_ARCHETYPES, TEST_PROFESSIONS } from "../../utils/collections"

const ARCHETYPE = TEST_ARCHETYPES[1]
const ARCHETYPE_PROFESSIONS = TEST_PROFESSIONS.filter(professions =>
	ARCHETYPE.professions["Main Gauche"].some(archetype => archetype.profession === professions.code)
)
const PROFESSION_1 = ARCHETYPE_PROFESSIONS[1]
const NEW_PROFESSION_1 = ARCHETYPE_PROFESSIONS[2]

const PROFESSION_2 = TEST_PROFESSIONS[11]

describe("Profession 1 Combobox should", () => {
	it("show character sheet profession1 value", async () => {
		await render_character_sheet({archetype: ARCHETYPE.code, profession1: PROFESSION_1.code})

		await then_textbox_has_a_value_of("Profession 1", PROFESSION_1.name)
	})

	it("send a 'set_value|profession1' and show updated value on change", async () => {
		await render_character_sheet({archetype: ARCHETYPE.code, profession1: PROFESSION_1.code})

		await when_combobox_item_is_changed("Profession 1", NEW_PROFESSION_1)

		await update_character_api_was_called_with([
			{
				action: "set_value",
				property: "profession1",
				value: NEW_PROFESSION_1.code
			}
		])
		await then_textbox_has_a_value_of("Profession 1", NEW_PROFESSION_1.name)
	})

	it("send a 'set_value|archetype' and show updated value on change if it was not set ", async () => {
		await render_character_sheet({archetype: null, profession1: null})

		await when_combobox_item_is_changed("Profession 1", NEW_PROFESSION_1)

		await update_character_api_was_called_with([
			{
				action: "set_value",
				property: "archetype",
				value: ARCHETYPE.code
			},
			{
				action: "set_value",
				property: "profession1",
				value: NEW_PROFESSION_1.code
			}
		])
		await then_textbox_has_a_value_of("Archetype", ARCHETYPE.name)
		await then_textbox_has_a_value_of("Profession 1", NEW_PROFESSION_1.name)
	})

	it("be disabled if it is not yours", async () => {
		await given_your_email_is(A_USER)
		await render_character_sheet({
			archetype: ARCHETYPE.code,
			profession1: PROFESSION_1.code,
			created_by: ANOTHER_USER
		})

		await then_textbox_is_disabled("Profession 1")
		await then_textbox_has_a_value_of("Profession 1", PROFESSION_1.name)
	})


	it("be blank by default", async () => {
		await render_character_sheet({})

		await then_textbox_has_a_value_of("Profession 1", "")
	})

	it("be disabled if you have profession2", async () => {
		await render_character_sheet({
			archetype: ARCHETYPE.code,
			profession1: PROFESSION_1.code,
			profession2: PROFESSION_2.code,
		})

		await then_textbox_is_disabled("Profession 1")
	})
})
