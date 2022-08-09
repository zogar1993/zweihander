import {
	A_USER,
	ANOTHER_USER,
	change_dots_value,
	given_your_email_is,
	render_character_sheet,
	then_dots_are_disabled,
	then_dots_is_checked_on,
	update_character_api_was_called_with
} from "@tests/web_tests/character_sheet/utils/utils"

const CHAOS_RANKS = 4
const NEW_CHAOS_RANKS = 6

describe("Chaos Ranks Dots should", () => {
	it("show character sheet chaos_ranks value", async () => {
		await render_character_sheet({chaos_ranks: CHAOS_RANKS})

		await then_dots_is_checked_on("Chaos Ranks", CHAOS_RANKS)
	})

	it("send a 'set_value|chaos_ranks' and show updated value on change", async () => {
		await render_character_sheet({chaos_ranks: CHAOS_RANKS})

		await change_dots_value("Chaos Ranks", NEW_CHAOS_RANKS)

		await update_character_api_was_called_with([
			{
				action: "set_value",
				property: "chaos_ranks",
				value: NEW_CHAOS_RANKS
			}
		])
		await then_dots_is_checked_on("Chaos Ranks", NEW_CHAOS_RANKS)
	})

	it("be disabled if it is not yours", async () => {
		await given_your_email_is(A_USER)
		await render_character_sheet({chaos_ranks: CHAOS_RANKS, created_by: ANOTHER_USER})

		await then_dots_are_disabled("Chaos Ranks")
		await then_dots_is_checked_on("Chaos Ranks", CHAOS_RANKS)
	})


	it("be blank by default", async () => {
		await render_character_sheet({})

		await then_dots_is_checked_on("Chaos Ranks", 0)
	})
})
