import {
	expect_character_to_be_unchanged,
	expect_character_to_have_item_removed,
	the_saved_character_has,
	update_character
} from "@tests/api_tests/utils"
import { TEST_TALENTS } from "@tests/web_tests/character_sheet/utils/collections"

describe("remove_from_array talent should", () => {
	it("remove the talent from the character", async () => {
		the_saved_character_has({ talents: [VALUE] })

		const result = await update_character([
			"remove_from_array",
			PROPERTY,
			VALUE
		])

		expect(result).toHaveStatusCode(204)
		expect_character_to_have_item_removed({ [PROPERTY]: VALUE })
	})

	it("accept only strings", async () => {
		the_saved_character_has({ talents: [VALUE] })

		const result = await update_character(["remove_from_array", PROPERTY, 1])

		expect(result).toHaveStatusCode(400)
		expect_character_to_be_unchanged()
	})

	it("not accept null", async () => {
		the_saved_character_has({ talents: [VALUE] })

		const result = await update_character(["remove_from_array", PROPERTY, null])

		expect(result).toHaveStatusCode(400)
		expect_character_to_be_unchanged()
	})
})

const PROPERTY = "talents"
const VALUE = TEST_TALENTS[1].code
