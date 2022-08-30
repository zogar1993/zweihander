import { when_combobox_item_is_changed } from "@tests/web_tests/character_sheet/utils/combobox-helpers"
import {
	then_textbox_has_a_value_of,
	then_textbox_is_disabled
} from "@tests/web_tests/character_sheet/utils/textbox-helpers"
import {
	A_USER,
	ANOTHER_USER,
	given_your_email_is, region,
	render_character_sheet,
	update_character_api_was_called_with
} from "@tests/web_tests/character_sheet/utils/utils"
import { TEST_ARCHETYPES, TEST_PROFESSIONS } from "../../utils/collections"


const ARCHETYPE = TEST_ARCHETYPES[1]
const ARCHETYPE_PROFESSIONS = TEST_PROFESSIONS.filter(professions =>
	ARCHETYPE.professions["main_gauche"].some(archetype => archetype.profession === professions.code)
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

		await then_textbox_has_a_value_of("Profession 3", PROFESSION_3.name, region("Background"))
	})

	it("send a 'set_value|profession3' and show updated value on change", async () => {
		await render_character_sheet({
			archetype: ARCHETYPE.code,
			profession1: PROFESSION_1.code,
			profession2: PROFESSION_2.code,
			profession3: PROFESSION_3.code
		})

		await when_combobox_item_is_changed("Profession 3", NEW_PROFESSION_3, region("Background"))

		await update_character_api_was_called_with([
			{
				action: "set_value",
				property: "profession3",
				value: NEW_PROFESSION_3.code
			}
		])
		await then_textbox_has_a_value_of("Profession 3", NEW_PROFESSION_3.name, region("Background"))
	})

	it("be disabled if it is not yours", async () => {
		await given_your_email_is(A_USER)
		await render_character_sheet({
			archetype: ARCHETYPE.code,
			profession1: PROFESSION_1.code,
			profession2: PROFESSION_2.code,
			profession3: PROFESSION_3.code, created_by: ANOTHER_USER
		})

		await then_textbox_is_disabled("Profession 3", region("Background"))
		await then_textbox_has_a_value_of("Profession 3", PROFESSION_3.name, region("Background"))
	})

	it("be disabled if you have no profession2", async () => {
		await render_character_sheet({
			archetype: ARCHETYPE.code,
			profession1: PROFESSION_1.code
		})

		await then_textbox_is_disabled("Profession 3", region("Background"))
	})

	it("be blank by default", async () => {
		await render_character_sheet({})

		await then_textbox_has_a_value_of("Profession 3", "", region("Background"))
	})
})
