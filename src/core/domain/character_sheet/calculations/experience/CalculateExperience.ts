import calculateTiers from "@core/domain/character_sheet/calculations/CalculateTiers"
import calculateSpellsExperience from "@core/domain/character_sheet/calculations/experience/CaculateSpellsExperience"
import calculateFocusExperience from "@core/domain/character_sheet/calculations/experience/CalculateFocusExperience"
import calculateSkillsExperience from "@core/domain/character_sheet/calculations/experience/CalculateSkillsExperience"
import { MagicSchoolTech } from "@core/domain/character_sheet/CharacterSheet"
import { SanitizedCharacterSheet } from "@core/domain/character_sheet/sanitization/SanitizeCharacterSheet"

export default function calculateExperience({
																							character,
																							schoolsCatalog,
																							professionProfile: { tiers, remaining }
																						}: {
	character: SanitizedCharacterSheet
	schoolsCatalog: ReadonlyArray<MagicSchoolTech>
	professionProfile: ReturnType<typeof calculateTiers>
}): number {

	let experience = 0

	experience += calculateSpellsExperience({ character, schoolsCatalog })
	experience += calculateFocusExperience({ character })

	tiers.map((x, i) => {
		const multiplier = (i + 1) * 100
		experience += multiplier //profession cost
		experience += x.attributes.bought.length * multiplier
		//skills experience is calculated later
		experience += x.talents.bought.length * multiplier
		experience += x.wildcards.length * multiplier
	})

	experience += calculateSkillsExperience({
		bought: tiers.map(x => x.skills.bought),
		remaining: remaining.skills
	})

	experience += remaining.talents.length * 100

	return experience
}