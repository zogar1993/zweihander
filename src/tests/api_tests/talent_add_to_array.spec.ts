import {
	expect_character_to_be_unchanged,
	expect_character_to_have_item_added,
	the_saved_character_has,
	update_character
} from "@tests/api_tests/utils"

describe("add_to_array talent should", () => {
	it("add the talent to the character", async () => {
		const result = await update_character(["add_to_array", PROPERTY, VALUE])

		expect(result.statusCode).toBe(200)
		expect_character_to_have_item_added({ [PROPERTY]: VALUE })
	})

	it("accept only strings", async () => {
		const result = await update_character(["add_to_array", PROPERTY, 1])

		expect(result.statusCode).toBe(400)
		expect_character_to_be_unchanged()
	})

	it("not accept null", async () => {
		const result = await update_character(["add_to_array", PROPERTY, null])

		expect(result.statusCode).toBe(400)
		expect_character_to_be_unchanged()
	})

	it("not accept duplicated values", async () => {
		the_saved_character_has({ talents: [VALUE] })

		const result = await update_character(["add_to_array", PROPERTY, VALUE])

		expect(result.statusCode).toBe(409)
		expect_character_to_be_unchanged()
	})
})

const PROPERTY = "talents"
const VALUE = "a_talent"
