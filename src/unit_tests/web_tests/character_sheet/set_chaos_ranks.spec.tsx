import {
	change_dots_value,
	render_character_sheet,
	update_character_api_was_called_with
} from "@tests/web_tests/character_sheet/utils/utils"

const NEW_CHAOS_RANKS = 6

describe("Chaos Ranks Dots should", () => {
	it("send a 'set_value|chaos_ranks' action on change", async () => {
		await render_character_sheet()

		await change_dots_value("Chaos Ranks", NEW_CHAOS_RANKS)

		await update_character_api_was_called_with([
			{
				action: "set_value",
				property: "chaos_ranks",
				value: NEW_CHAOS_RANKS
			}
		])
	})
})
