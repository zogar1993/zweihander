import { ATTRIBUTE_DEFINITIONS } from "@core/domain/attribute/ATTRIBUTE_DEFINITIONS"
import { act } from "@testing-library/react"
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

const ATTRIBUTE_ADVANCES = 1
const NEW_ATTRIBUTE_ADVANCES = 2
const ATTRIBUTE = ATTRIBUTE_DEFINITIONS[2]

describe("Attribute Advances Dots should", () => {
	it("show character sheet attributes.{code}.advances value", async () => {
		await render_character_sheet({ attributes: { [ATTRIBUTE.code]: { advances: ATTRIBUTE_ADVANCES } } })

		await then_dots_is_checked_on(`${ATTRIBUTE.name} Advances`, ATTRIBUTE_ADVANCES)
	})

	it("send a 'set_value|attributes.{code}.advances' and show updated value on change", async () => {
		await render_character_sheet({ attributes: { [ATTRIBUTE.code]: { advances: ATTRIBUTE_ADVANCES } } })

		await change_dots_value(`${ATTRIBUTE.name} Advances`, NEW_ATTRIBUTE_ADVANCES)

		await update_character_api_was_called_with([
			{
				action: "set_value",
				property: `attributes.${ATTRIBUTE.code}.advances`,
				value: NEW_ATTRIBUTE_ADVANCES
			}
		])
		await then_dots_is_checked_on(`${ATTRIBUTE.name} Advances`, NEW_ATTRIBUTE_ADVANCES)
	})

	it("be disabled if it is not yours", async () => {
		await given_your_email_is(A_USER)
		await render_character_sheet({
			attributes: { [ATTRIBUTE.code]: { advances: ATTRIBUTE_ADVANCES } },
			created_by: ANOTHER_USER
		})

		await then_dots_are_disabled(`${ATTRIBUTE.name} Advances`)
		await then_dots_is_checked_on(`${ATTRIBUTE.name} Advances`, ATTRIBUTE_ADVANCES)
	})


	it("be blank by default", async () => {
		await render_character_sheet({})

		await then_dots_is_checked_on(`${ATTRIBUTE.name} Advances`, 0)
	})
})
