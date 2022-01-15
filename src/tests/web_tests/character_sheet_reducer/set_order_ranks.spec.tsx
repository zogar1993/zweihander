import { ACCORDION_ITEM } from "@web/constants/ACCORDION_ITEM"
import {
	click_menu_item,
	render_character_sheet,
	select_dots_value,
	update_character_api_was_called_with
} from "./utils/utils"

const NEW_ORDER_RANKS = 6

describe("Order Ranks Dots should", () => {
	it("send a 'set_value|order_ranks' action on change", async () => {
		await render_character_sheet()

		await click_menu_item(ACCORDION_ITEM.ALIGNMENT)
		await select_dots_value("Order Ranks", NEW_ORDER_RANKS)

		await update_character_api_was_called_with([
			{ action: "set_value", property: "order_ranks", value: NEW_ORDER_RANKS }
		])
	})
})
