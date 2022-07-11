import {
	change_combobox_item,
	render_character_sheet,
	update_character_api_was_called_with
} from "@tests/web_tests/character_sheet/utils/utils"
import { TEST_ARCHETYPES, TEST_PROFESSIONS } from "./utils/collections"

const ARCHETYPE = TEST_ARCHETYPES[0]
const PROFESSION_1 = TEST_PROFESSIONS.find(
	x => x.code === ARCHETYPE.professions["Main Gauche"][0].profession
)!
const PROFESSION_2 = TEST_PROFESSIONS[2]
const NEW_PROFESSION_3 = TEST_PROFESSIONS[3]

describe("Profession 3 Combobox should", () => {
	it("send a 'set_value|profession3' action on change", async () => {
		await render_character_sheet({
			archetype: ARCHETYPE.code,
			profession1: PROFESSION_1.code,
			profession2: PROFESSION_2.code
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
})
