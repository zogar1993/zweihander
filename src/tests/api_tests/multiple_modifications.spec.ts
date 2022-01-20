import { TEST_MAGIC_SCHOOLS } from "../web_tests/character_sheet_reducer/utils/collections"
import {
	expect_character_to_have_changed,
	update_character,
	updateCharacterSpy
} from "./utils"

describe("Character Update API should", () => {
	beforeEach(() => {
		updateCharacterSpy.mockReturnValue(Promise.resolve())
	})

	afterEach(() => {
		updateCharacterSpy.mockReset()
	})

	it("when sending multiple actions, apply them all", async () => {
		const result = await update_character(
			["set_value", PROPERTY_1, PROPERTY_1_VALUE],
			["set_value", PROPERTY_2, PROPERTY_2_VALUE],
			["add_to_array", PROPERTY_3, PROPERTY_3_VALUE],
			["delete_property", PROPERTY_4]
		)

		expect_character_to_have_changed({
			set: {
				[PROPERTY_1]: PROPERTY_1_VALUE,
				[PROPERTY_2]: PROPERTY_2_VALUE
			},
			push: { [PROPERTY_3]: PROPERTY_3_VALUE },
			unset: [PROPERTY_4]
		})
		expect(result.statusCode).toBe(200)
	})
})

const PROPERTY_1 = "name"
const PROPERTY_2 = "age"
const PROPERTY_3 = "talents"
const PROPERTY_4 = `spells.${TEST_MAGIC_SCHOOLS[0]}`

const PROPERTY_1_VALUE = "Linuar"
const PROPERTY_2_VALUE = 36
const PROPERTY_3_VALUE = "baking"

//TODO P3 maybe fail if same property is sent multiple times
