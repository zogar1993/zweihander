import {
	A_USER, ANOTHER_USER,
	change_combobox_item, given_your_email_is,
	render_character_sheet, then_textbox_has_a_value_of, then_textbox_is_disabled,
	update_character_api_was_called_with
} from "@tests/web_tests/character_sheet/utils/utils"
import {TEST_ARCHETYPES, TEST_PROFESSIONS} from "../../utils/collections"


const ARCHETYPE = TEST_ARCHETYPES[1]
const ARCHETYPE_PROFESSIONS = TEST_PROFESSIONS.filter(professions =>
	ARCHETYPE.professions["Main Gauche"].some(archetype => archetype.profession === professions.code)
)
const PROFESSION_1 = ARCHETYPE_PROFESSIONS[1]

const PROFESSION_2 = TEST_PROFESSIONS[11]

const PROFESSION_3 = TEST_PROFESSIONS[21]
const NEW_PROFESSION_3 = TEST_PROFESSIONS[22]

describe("Profession 3 Combobox should", () => {
	it("show character sheet profession3 value", async () => {
		await render_character_sheet({
			archetype: ARCHETYPE.code,
			profession1: PROFESSION_1.code,
			profession2: PROFESSION_2.code,
			profession3: PROFESSION_3.code
		})

		await then_textbox_has_a_value_of("Profession 3", PROFESSION_3.name)
	})

	it("send a 'set_value|profession3' and show updated value on change", async () => {
		await render_character_sheet({
			archetype: ARCHETYPE.code,
			profession1: PROFESSION_1.code,
			profession2: PROFESSION_2.code,
			profession3: PROFESSION_3.code
		})

		await change_combobox_item("Profession 3", NEW_PROFESSION_3)

		await update_character_api_was_called_with([
			{
				action: "set_value",
				property: "profession3",
				value: NEW_PROFESSION_3.code
			}
		])
	})

	it("be disabled if it is not yours", async () => {
		await given_your_email_is(A_USER)
		await render_character_sheet({
			archetype: ARCHETYPE.code,
			profession1: PROFESSION_1.code,
			profession2: PROFESSION_2.code,
			profession3: PROFESSION_3.code, created_by: ANOTHER_USER
		})

		await then_textbox_is_disabled("Profession 3")
		await then_textbox_has_a_value_of("Profession 3", PROFESSION_3.name)
	})

	it("be disabled if you have no profession2", async () => {
		await render_character_sheet({
			archetype: ARCHETYPE.code,
			profession1: PROFESSION_1.code
		})

		await then_textbox_is_disabled("Profession 3")
	})

	it("be blank by default", async () => {
		await render_character_sheet({})

		await then_textbox_has_a_value_of("Profession 3", "")
	})
})