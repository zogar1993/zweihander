import {
	call_character_sheet_api,
	character_sheet_request,
	expect_character_to_have_attribute_set,
	updateCharacterSpy
} from "@tests/api_tests/utils"

describe("set_value order_ranks should", () => {
	beforeEach(() => {
		updateCharacterSpy.mockReturnValue(Promise.resolve())
	})

	afterEach(() => {
		updateCharacterSpy.mockReset()
	})

	it("change the order ranks of the character", async () => {
		const request = character_sheet_request([
			{
				action: "set_value",
				property: PROPERTY_ORDER_RANKS,
				value: CHARACTER_ORDER_RANKS
			}
		])

		const result = await call_character_sheet_api(request)

		expect_character_to_have_attribute_set({
			order_ranks: CHARACTER_ORDER_RANKS
		})
		expect(result.statusCode).toBe(200)
	})
})

const PROPERTY_ORDER_RANKS = "order_ranks"
const CHARACTER_ORDER_RANKS = 4
