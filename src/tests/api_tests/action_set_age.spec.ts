import {
	expect_character_to_be_unchanged,
	expect_character_to_have_attribute_set,
	update_character,
	updateCharacterSpy
} from "./utils"

describe("set_value age should", () => {
	beforeEach(() => {
		updateCharacterSpy.mockReturnValue(Promise.resolve())
	})

	afterEach(() => {
		updateCharacterSpy.mockReset()
	})

	it("change the age of the character", async () => {
		const result = await update_character(["set_value", PROPERTY, VALUE])

		expect(result.statusCode).toBe(200)
		expect_character_to_have_attribute_set({ age: VALUE })
	})

	it("accept only numbers", async () => {
		const result = await update_character(["set_value", PROPERTY, "a_string"])

		expect(result.statusCode).toBe(400)
		expect_character_to_be_unchanged()
	})

	it("not accept null", async () => {
		const result = await update_character(["set_value", PROPERTY, null])

		expect(result.statusCode).toBe(400)
		expect_character_to_be_unchanged()
	})
})

const PROPERTY = "age"
const VALUE = 36
