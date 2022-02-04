import {
	expect_character_to_be_unchanged,
	expect_character_to_have_item_added,
	the_saved_character_has,
	update_character
} from "@tests/api_tests/utils"
import { TEST_MAGIC_SCHOOLS } from "@tests/web_tests/character_sheet/utils/collections"

describe("add_to_array spell should", () => {
	it("add the spell to the character", async () => {
		the_saved_character_has({ spells: { [SCHOOL.code]: [IRRELEVANT_VALUE] } })

		const result = await update_character(["add_to_array", PROPERTY, VALUE])

		expect_character_to_have_item_added({ [PROPERTY]: VALUE })
		expect(result).toHaveStatusCode(200)
	})

	it("accept only strings", async () => {
		the_saved_character_has({ spells: { [SCHOOL.code]: [IRRELEVANT_VALUE] } })

		const result = await update_character(["add_to_array", PROPERTY, 1])

		expect(result).toHaveStatusCode(400)
		expect_character_to_be_unchanged()
	})

	it("not accept null", async () => {
		the_saved_character_has({ spells: { [SCHOOL.code]: [IRRELEVANT_VALUE] } })

		const result = await update_character(["add_to_array", PROPERTY, null])

		expect(result).toHaveStatusCode(400)
		expect_character_to_be_unchanged()
	})

	it("not accept duplicated values", async () => {
		the_saved_character_has({ spells: { [SCHOOL.code]: [VALUE] } })

		const result = await update_character(["add_to_array", PROPERTY, VALUE])

		expect(result).toHaveStatusCode(409)
		expect_character_to_be_unchanged()
	})

	it("fail when character has no preexisting array", async () => {
		const result = await update_character(["add_to_array", PROPERTY, VALUE])

		expect(result).toHaveStatusCode(409)
		expect_character_to_be_unchanged()
	})

	it("not accept non predefined school", async () => {
		the_saved_character_has({ spells: { [SCHOOL.code]: [IRRELEVANT_VALUE] } })

		const result = await update_character([
			"add_to_array",
			`spells.whatever`,
			VALUE
		])

		expect(result).toHaveStatusCode(409)
		expect_character_to_be_unchanged()
	})

	it("not accept non predefined spell", async () => {
		the_saved_character_has({ spells: { [SCHOOL.code]: [IRRELEVANT_VALUE] } })

		const result = await update_character([
			"add_to_array",
			PROPERTY,
			"whatever"
		])

		expect(result).toHaveStatusCode(409)
		expect_character_to_be_unchanged()
	})
})

const SCHOOL = TEST_MAGIC_SCHOOLS[1]
const VALUE = SCHOOL.spells[1].code
const PROPERTY = `spells.${SCHOOL.code}`
const IRRELEVANT_VALUE = SCHOOL.spells[4].code
