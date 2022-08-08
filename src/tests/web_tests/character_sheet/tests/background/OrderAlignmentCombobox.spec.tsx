import {
	A_USER, ANOTHER_USER,
	change_combobox_item, given_your_email_is,
	render_character_sheet, then_textbox_has_a_value_of, then_textbox_is_disabled,
	update_character_api_was_called_with
} from "@tests/web_tests/character_sheet/utils/utils"
import { TEST_ORDER_ALIGNMENTS } from "../../utils/collections"

const ALIGNMENT = TEST_ORDER_ALIGNMENTS[1]
const NEW_ALIGNMENT = TEST_ORDER_ALIGNMENTS[2]

describe("Order Alignment Combobox should", () => {
	it("show character sheet order_alignment value", async () => {
		await render_character_sheet({order_alignment: ALIGNMENT.code})

		await then_textbox_has_a_value_of("Order Alignment", ALIGNMENT.name)
	})

	it("send a 'set_value|order_alignment' and show updated value on change", async () => {
		await render_character_sheet({order_alignment: ALIGNMENT.code})

		await change_combobox_item("Order Alignment", NEW_ALIGNMENT)

		await update_character_api_was_called_with([
			{
				action: "set_value",
				property: "order_alignment",
				value: NEW_ALIGNMENT.code
			}
		])

		await then_textbox_has_a_value_of("Order Alignment", NEW_ALIGNMENT.name)
	})

	it("be disabled if it is not yours", async () => {
		await given_your_email_is(A_USER)
		await render_character_sheet({order_alignment: ALIGNMENT.code, created_by: ANOTHER_USER})

		await then_textbox_is_disabled("Order Alignment")
		await then_textbox_has_a_value_of("Order Alignment", ALIGNMENT.name)
	})


	it("be blank by default", async () => {
		await render_character_sheet({})

		await then_textbox_has_a_value_of("Order Alignment", "")
	})
})
