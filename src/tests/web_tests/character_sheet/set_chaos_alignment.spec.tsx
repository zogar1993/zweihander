import { TEST_CHAOS_ALIGNMENTS } from "./utils/collections"
import {
	change_combobox_item,
	render_character_sheet,
	update_character_api_was_called_with
} from "./utils/utils"

const NEW_ALIGNMENT = TEST_CHAOS_ALIGNMENTS[2]

describe("Chaos Alignment Combobox should", () => {
	it("send a 'set_value|chaos_alignment' action on change", async () => {
		await render_character_sheet()

		await change_combobox_item("Chaos Alignment", NEW_ALIGNMENT)

		await update_character_api_was_called_with([
			{
				action: "set_value",
				property: "chaos_alignment",
				value: NEW_ALIGNMENT.code
			}
		])
	})
})
