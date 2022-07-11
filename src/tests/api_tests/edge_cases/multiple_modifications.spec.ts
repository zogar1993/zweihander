import {
	expect_character_to_be_unchanged,
	expect_character_to_have_changed,
	update_character
} from "@tests/api_tests/utils"
import {
	TEST_MAGIC_SCHOOLS,
	TEST_TALENTS
} from "@tests/web_tests/character_sheet/utils/collections"

describe("Character Update API should", () => {
	it("when sending multiple actions, apply them all", async () => {
		const result = await update_character(
			["set_value", PROPERTY_1, PROPERTY_1_VALUE],
			["set_value", PROPERTY_2, PROPERTY_2_VALUE],
			["add_to_array", PROPERTY_3, PROPERTY_3_VALUE_A],
			["delete_property", PROPERTY_4]
		)

		expect(result).toHaveStatusCode(204)
		expect_character_to_have_changed({
			set: {
				[PROPERTY_1]: PROPERTY_1_VALUE,
				[PROPERTY_2]: PROPERTY_2_VALUE
			},
			push: { [PROPERTY_3]: PROPERTY_3_VALUE_A },
			unset: [PROPERTY_4]
		})
	})

	it("only one action can be sent per property", async () => {
		const result = await update_character(
			["add_to_array", PROPERTY_3, PROPERTY_3_VALUE_A],
			["remove_from_array", PROPERTY_3, PROPERTY_3_VALUE_B]
		)

		expect(result).toHaveStatusCode(400)
		expect_character_to_be_unchanged()
	})

	it("actions may only be sent once per property", async () => {
		const result = await update_character(
			["add_to_array", PROPERTY_3, PROPERTY_3_VALUE_A],
			["add_to_array", PROPERTY_3, PROPERTY_3_VALUE_B]
		)

		expect(result).toHaveStatusCode(400)
		expect_character_to_be_unchanged()
	})
})

const PROPERTY_1 = "name"
const PROPERTY_2 = "age"
const PROPERTY_3 = "talents"
const PROPERTY_4 = `spells.${TEST_MAGIC_SCHOOLS[0].code}`

const PROPERTY_1_VALUE = "Linuar"
const PROPERTY_2_VALUE = 36
const PROPERTY_3_VALUE_A = TEST_TALENTS[1].code
const PROPERTY_3_VALUE_B = TEST_TALENTS[2].code
