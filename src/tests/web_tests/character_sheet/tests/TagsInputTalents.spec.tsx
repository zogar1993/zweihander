import { fireEvent, screen, waitFor } from "@testing-library/react"
import { TEST_TALENTS } from "@tests/web_tests/character_sheet/utils/collections"
import { when_combobox_item_is_changed, then_is_a_combobox_option } from "@tests/web_tests/character_sheet/utils/combobox-helpers"
import {
	render_character_sheet,
	update_character_api_was_called_with
} from "@tests/web_tests/character_sheet/utils/utils"

const PRE_EXISTING_TALENT_1 = TEST_TALENTS[1]
const PRE_EXISTING_TALENT_2 = TEST_TALENTS[2]
const NEW_TALENT = TEST_TALENTS[3]

describe("Talents Tag Input should", () => {
	it("send a 'add_to_array|talents' action on add", async () => {
		await render_character_sheet()

		await when_combobox_item_is_changed("New Talent", NEW_TALENT)

		await update_character_api_was_called_with([
			{
				action: "add_to_array",
				property: "talents",
				value: NEW_TALENT.code
			}
		])
	})

	it("send a 'remove_from_array|talents' action on remove", async () => {
		await render_character_sheet({ talents: [PRE_EXISTING_TALENT_1.code] })

		const tag = getCheckbox(PRE_EXISTING_TALENT_1.name)
		fireEvent.click(tag)

		await update_character_api_was_called_with([
			{
				action: "remove_from_array",
				property: "talents",
				value: PRE_EXISTING_TALENT_1.code
			}
		])
	})

	it("not have preexisting values as eligible", async () => {
		await render_character_sheet({ talents: [PRE_EXISTING_TALENT_1.code] })

		await waitFor(async () =>
			expect(
				await then_is_a_combobox_option("New Talent", PRE_EXISTING_TALENT_1)
			).toBeFalsy()
		)
	})

	it("not have newly added value as eligible", async () => {
		await render_character_sheet()
		await when_combobox_item_is_changed("New Talent", NEW_TALENT)

		await waitFor(async () =>
			expect(
				await then_is_a_combobox_option("New Talent", NEW_TALENT)
			).toBeFalsy()
		)
	})

	it("have removed value as eligible", async () => {
		await render_character_sheet({ talents: [PRE_EXISTING_TALENT_1.code] })
		fireEvent.click(getCheckbox(PRE_EXISTING_TALENT_1.name))

		await waitFor(async () =>
			expect(
				await then_is_a_combobox_option("New Talent", PRE_EXISTING_TALENT_1)
			).toBeTruthy()
		)
	})
	const getCheckbox = (name: string) => screen.getByRole("checkbox", {name: name})
})
