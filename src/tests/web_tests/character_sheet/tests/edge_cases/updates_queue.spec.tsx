import { when_combobox_item_is_changed } from "@tests/web_tests/character_sheet/utils/combobox-helpers"
import { UPBRINGINGS } from "@web/components/character_sheet/bio/Constants"
import {
	DEFAULT_CHARACTER_SHEET,
	NEW_UPDATE_DATE,
	render_character_sheet,
	update_character_api_was_called_with,
	updateCharacterOfIdSpy
} from "../../utils/utils"

const UPBRINGING_A = UPBRINGINGS[1]
const UPBRINGING_B = UPBRINGINGS[2]
describe("useCharacterUpdatesQueue should", () => {
	it("call the API twice when queueing 2 actions", async () => {
		await render_character_sheet({ upbringing: null })
		await when_combobox_item_is_changed("Upbringing", UPBRINGING_A)
		await when_combobox_item_is_changed("Upbringing", UPBRINGING_B)

		await update_character_api_was_called_with(
			[
				{
					action: "set_value",
					property: "upbringing",
					value: UPBRINGING_A.code
				}
			],
			{ calls: 2, current: 1, updated_at: DEFAULT_CHARACTER_SHEET.updated_at }
		)

		await update_character_api_was_called_with(
			[
				{
					action: "set_value",
					property: "upbringing",
					value: UPBRINGING_B.code
				}
			],
			{ calls: 2, current: 2, updated_at: NEW_UPDATE_DATE }
		)
	})

	it("call the API twice when queueing 2 actions before the first call", async () => {
		await render_character_sheet({ upbringing: null })
		updateCharacterOfIdSpy.mockReturnValue(
			new Promise(resolve => setTimeout(() => resolve(NEW_UPDATE_DATE), 1000))
		)
		await when_combobox_item_is_changed("Upbringing", UPBRINGING_A)
		await when_combobox_item_is_changed("Upbringing", UPBRINGING_B)

		await update_character_api_was_called_with(
			[
				{
					action: "set_value",
					property: "upbringing",
					value: UPBRINGING_A.code
				}
			],
			{ calls: 2, current: 1, updated_at: DEFAULT_CHARACTER_SHEET.updated_at }
		)

		await update_character_api_was_called_with(
			[
				{
					action: "set_value",
					property: "upbringing",
					value: UPBRINGING_B.code
				}
			],
			{ calls: 2, current: 2, updated_at: NEW_UPDATE_DATE }
		)
	})
})
