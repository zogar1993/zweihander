import calculateAncestry from "@core/domain/character_sheet/calculations/CalculateAncestry"
import { TEST_ANCESTRIES } from "@tests/web_tests/character_sheet/utils/collections"

const ANCESTRY = TEST_ANCESTRIES[1]

describe("CalculateAncestry should", () => {
	it("return null when there is no selected ancestry", async () => {
		const ancestry = calculateAncestry({
			character: { ancestry: null },
			ancestriesCatalog: TEST_ANCESTRIES
		})

		expect(ancestry).toEqual(null)
	})

	it("return ancestry of selected code", async () => {
		const ancestry = calculateAncestry({
			character: { ancestry: ANCESTRY.code },
			ancestriesCatalog: TEST_ANCESTRIES
		})

		expect(ancestry).toEqual(ANCESTRY)
	})
})
