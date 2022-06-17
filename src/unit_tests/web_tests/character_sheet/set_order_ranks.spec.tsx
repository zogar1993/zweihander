import {
	change_dots_value,
	render_character_sheet,
	update_character_api_was_called_with
} from "@tests/web_tests/character_sheet/utils/utils"

const NEW_ORDER_RANKS = 6

describe("Order Ranks Dots should", () => {
	it("send a 'set_value|order_ranks' action on change", async () => {
		await render_character_sheet()

		await change_dots_value("Order Ranks", NEW_ORDER_RANKS)

		await update_character_api_was_called_with([
			{ action: "set_value", property: "order_ranks", value: NEW_ORDER_RANKS }
		])
	})
})
