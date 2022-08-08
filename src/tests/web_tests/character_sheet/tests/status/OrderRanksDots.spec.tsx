import {
	A_USER, ANOTHER_USER,
	change_dots_value, given_your_email_is,
	render_character_sheet, then_dots_are_disabled, then_dots_is_checked_on,
	update_character_api_was_called_with
} from "@tests/web_tests/character_sheet/utils/utils"

const ORDER_RANKS = 4
const NEW_ORDER_RANKS = 6

describe("Order Ranks Dots should", () => {
	it("show character sheet order_ranks value", async () => {
		await render_character_sheet({order_ranks: ORDER_RANKS})

		await then_dots_is_checked_on("Order Ranks", ORDER_RANKS)
	})
	
	it("send a 'set_value|order_ranks' and show updated value on change", async () => {
		await render_character_sheet()

		await change_dots_value("Order Ranks", NEW_ORDER_RANKS)

		await update_character_api_was_called_with([
			{ action: "set_value", property: "order_ranks", value: NEW_ORDER_RANKS }
		])
	})

	it("be disabled if it is not yours", async () => {
		await given_your_email_is(A_USER)
		await render_character_sheet({order_ranks: ORDER_RANKS, created_by: ANOTHER_USER})

		await then_dots_are_disabled("Order Ranks")
		await then_dots_is_checked_on("Order Ranks", ORDER_RANKS)
	})


	it("be blank by default", async () => {
		await render_character_sheet({})

		await then_dots_is_checked_on("Order Ranks", 0)
	})
})
