import {
	call_character_sheet_api,
	character_sheet_request,
	expect_character_to_have_item_added,
	updateCharacterSpy
} from "@tests/api_tests/utils"

describe("add_to_array talent should", () => {
	beforeEach(() => {
		updateCharacterSpy.mockReturnValue(Promise.resolve())
	})

	afterEach(() => {
		updateCharacterSpy.mockReset()
	})

	it("add the talent to the character", async () => {
		const request = character_sheet_request([
			{
				action: "add_to_array",
				property: PROPERTY,
				value: VALUE
			}
		])

		const result = await call_character_sheet_api(request)

		expect_character_to_have_item_added({ talents: VALUE })
		expect(result.statusCode).toBe(200)
	})
})

const PROPERTY = "talents"
const VALUE = "cultured"
