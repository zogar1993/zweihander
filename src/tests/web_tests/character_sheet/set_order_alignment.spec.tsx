import { TEST_ORDER_ALIGNMENTS } from "./utils/collections"
import {
	change_combobox_item,
	render_character_sheet,
	update_character_api_was_called_with
} from "@tests/web_tests/character_sheet/utils/utils"

const NEW_ALIGNMENT = TEST_ORDER_ALIGNMENTS[2]

describe("Order Alignment Combobox should", () => {
	it("send a 'set_value|order_alignment' action on change", async () => {
		await render_character_sheet()

		await change_combobox_item("Order Alignment", NEW_ALIGNMENT)

		await update_character_api_was_called_with([
			{
				action: "set_value",
				property: "order_alignment",
				value: NEW_ALIGNMENT.code
			}
		])
	})
})
