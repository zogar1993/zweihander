import {
	expect_character_to_be_unchanged,
	expect_character_to_have_item_added,
	the_saved_character_has,
	update_character
} from "@tests/api_tests/utils"
import { TEST_TALENTS } from "@tests/web_tests/character_sheet/utils/collections"

describe("add_to_array talent should", () => {
	it("add the talent to the character", async () => {
		const result = await update_character(["add_to_array", PROPERTY, VALUE])

		expect(result).toHaveStatusCode(200)
		expect_character_to_have_item_added({ [PROPERTY]: VALUE })
	})

	it("accept only strings", async () => {
		const result = await update_character(["add_to_array", PROPERTY, 1])

		expect(result).toHaveStatusCode(400)
		expect_character_to_be_unchanged()
	})

	it("not accept null", async () => {
		const result = await update_character(["add_to_array", PROPERTY, null])

		expect(result).toHaveStatusCode(400)
		expect_character_to_be_unchanged()
	})

	it("not accept duplicated values", async () => {
		the_saved_character_has({ talents: [VALUE] })

		const result = await update_character(["add_to_array", PROPERTY, VALUE])

		expect(result).toHaveStatusCode(409)
		expect_character_to_be_unchanged()
	})

	it("accept only predefined talents", async () => {
		const result = await update_character([
			"add_to_array",
			PROPERTY,
			"whatever"
		])

		expect(result).toHaveStatusCode(409)
		expect_character_to_be_unchanged()
	})
})

const PROPERTY = "talents"
const VALUE = TEST_TALENTS[1].code
