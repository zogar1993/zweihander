import { TEST_ARCHETYPES, TEST_PROFESSIONS } from "./utils/collections"
import {
	render_character_sheet_page,
	select_combobox_item,
	update_character_api_was_called_with
} from "./utils/utils"

const ARCHETYPE = TEST_ARCHETYPES[0]
const NEW_PROFESSION_1 = TEST_PROFESSIONS.find(
	x => x.code === ARCHETYPE.professions["Main Gauche"][0].profession
)!

describe("Profession 1 Combobox should", () => {
	it("send a 'set_value|profession1' action on change", async () => {
		await render_character_sheet_page({ archetype: ARCHETYPE.code })

		await select_combobox_item("Profession 1", NEW_PROFESSION_1)

		await update_character_api_was_called_with([
			{
				action: "set_value",
				property: "profession1",
				value: NEW_PROFESSION_1.code
			}
		])
	})
})
