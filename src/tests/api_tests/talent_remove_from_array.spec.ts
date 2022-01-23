import {
	expect_character_to_be_unchanged,
	expect_character_to_have_item_removed,
	the_saved_character_has,
	update_character
} from "@tests/api_tests/utils"

describe("remove_from_array talent should", () => {
	it("remove the talent from the character", async () => {
		the_saved_character_has({ talents: [VALUE] })

		const result = await update_character([
			"remove_from_array",
			PROPERTY,
			VALUE
		])

		expect_character_to_have_item_removed({ [PROPERTY]: VALUE })
		expect(result.statusCode).toBe(200)
	})

	it("accept only strings", async () => {
		the_saved_character_has({ talents: [VALUE] })

		const result = await update_character(["remove_from_array", PROPERTY, 1])

		expect(result.statusCode).toBe(400)
		expect_character_to_be_unchanged()
	})

	it("not accept null", async () => {
		the_saved_character_has({ talents: [VALUE] })

		const result = await update_character(["remove_from_array", PROPERTY, null])

		expect(result.statusCode).toBe(400)
		expect_character_to_be_unchanged()
	})
})

const PROPERTY = "talents"
const VALUE = "a_talent"
