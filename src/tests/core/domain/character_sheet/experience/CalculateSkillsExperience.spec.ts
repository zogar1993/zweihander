import calculateSkillsExperience from "@core/domain/character_sheet/calculations/experience/CalculateSkillsExperience"

describe("CalculateSkillsExperience should", () => {
	it("return 0 when there are no tiers", async () => {
		const experience = calculateSkillsExperience({ bought: [], remaining: [] })

		expect(experience).toEqual(0)
	})
	it("return 0 when there are no profession skills nor reminder skills", async () => {
		const experience = calculateSkillsExperience({ bought: [[], [], []], remaining: [] })

		expect(experience).toEqual(0)
	})

	it("return 100 if there is one first profession skill", async () => {
		const experience = calculateSkillsExperience({ bought: [["gamble"]], remaining: [] })

		expect(experience).toEqual(100)
	})

	it("return 200 if there are two first profession skills", async () => {
		const experience = calculateSkillsExperience({ bought: [["gamble", "ride"]], remaining: [] })

		expect(experience).toEqual(200)
	})

	it("return 200 if there is one second profession skill", async () => {
		const experience = calculateSkillsExperience({ bought: [[], ["gamble"]], remaining: [] })

		expect(experience).toEqual(200)
	})

	it("return 400 if there are two second profession skills", async () => {
		const experience = calculateSkillsExperience({ bought: [[], ["gamble", "ride"]], remaining: [] })

		expect(experience).toEqual(400)
	})

	it("return 300 if there is one third profession skill", async () => {
		const experience = calculateSkillsExperience({ bought: [[], [], ["gamble"]], remaining: [] })

		expect(experience).toEqual(300)
	})

	it("return 600 if there are two third profession skills", async () => {
		const experience = calculateSkillsExperience({ bought: [[], [], ["gamble", "ride"]], remaining: [] })

		expect(experience).toEqual(600)
	})

	it("return 600 if there is one skill for each tier", async () => {
		const experience = calculateSkillsExperience({ bought: [["charm"], ["gamble"], ["ride"]], remaining: [] })

		expect(experience).toEqual(600)
	})

	it("have outside of profession skill cost 200", async () => {
		const experience = calculateSkillsExperience({ bought: [], remaining: ["ride"] })

		expect(experience).toEqual(200)
	})

	it("have outside of profession skill cost 200 when skill is bought for later tiers", async () => {
		const experience = calculateSkillsExperience({ bought: [[], ["ride"], ["ride"]], remaining: ["ride"] })

		expect(experience).toEqual(700)
	})

	it("have outside of profession skill cost 400 when first tier is bough", async () => {
		const experience = calculateSkillsExperience({ bought: [["ride"]], remaining: ["ride"] })

		expect(experience).toEqual(500)
	})

	it("have outside of profession skill cost 600 when first and second tiers are bough", async () => {
		const experience = calculateSkillsExperience({ bought: [["ride"], ["ride"]], remaining: ["ride"] })

		expect(experience).toEqual(900)
	})

	it("have outside of professions stack", async () => {
		const experience = calculateSkillsExperience({ bought: [], remaining: ["ride", "ride", "ride"] })

		expect(experience).toEqual(1200)
	})

	it("fail if skill is bough on all professions and also a remainder", async () => {
		const func = () => calculateSkillsExperience({ bought: [["ride"], ["ride"], ["ride"]], remaining: ["ride"] })

		expect(func).toThrow(Error)
	})

	it("fail if reminders exceed 3 times same skill", async () => {
		const func = () => calculateSkillsExperience({ bought: [], remaining: ["ride", "ride", "ride", "ride"] })

		expect(func).toThrow(Error)
	})
})