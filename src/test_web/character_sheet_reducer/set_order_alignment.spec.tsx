import { TEST_ORDER_ALIGNMENTS } from "./utils/collections"
import {
	render_character_sheet_page,
	select_combobox_item,
	update_character_api_was_called_with
} from "./utils/utils"

const NEW_ALIGNMENT = TEST_ORDER_ALIGNMENTS[2]

describe("Order Alignment Combobox should", () => {
	it("send a 'set_value|order_alignment' action on change", async () => {
		await render_character_sheet_page()

		await select_combobox_item("Order Alignment", NEW_ALIGNMENT)

		await update_character_api_was_called_with([
			{
				action: "set_value",
				property: "order_alignment",
				value: NEW_ALIGNMENT.code
			}
		])
	})
})
