import { TEST_ARCHETYPES, TEST_PROFESSIONS } from "./utils/collections"
import {
	change_combobox_item,
	render_character_sheet,
	update_character_api_was_called_with
} from "@tests/web_tests/character_sheet/utils/utils"

const ARCHETYPE = TEST_ARCHETYPES[0]
const PROFESSION_1 = TEST_PROFESSIONS.find(
	x => x.code === ARCHETYPE.professions["Main Gauche"][0].profession
)!
const NEW_PROFESSION = TEST_PROFESSIONS[5]

describe("Profession 2 Combobox should", () => {
	it("send a 'set_value|profession2' action on change", async () => {
		await render_character_sheet({
			archetype: ARCHETYPE.code,
			profession1: PROFESSION_1.code
		})

		await change_combobox_item("Profession 2", NEW_PROFESSION)

		await update_character_api_was_called_with([
			{
				action: "set_value",
				property: "profession2",
				value: NEW_PROFESSION.code
			}
		])
	})
})
