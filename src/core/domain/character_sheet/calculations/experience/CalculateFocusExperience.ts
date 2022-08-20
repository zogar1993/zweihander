import { SanitizedCharacterSheet } from "@core/domain/character_sheet/sanitization/SanitizeCharacterSheet"
import { getByCode } from "@core/domain/general/GetByCode"
import { SKILL_DEFINITIONS } from "@core/domain/skill/SKILL_DEFINITIONS"
import { SkillCode } from "@core/domain/skill/SkillCode"
import { UPBRINGINGS } from "@web/components/character_sheet/bio/Constants"

export default function calculateFocusExperience({
																									 character: { upbringing, focuses }
																								 }: {
	character: Pick<SanitizedCharacterSheet, "focuses" | "upbringing">
}) {
	const favored_attribute = upbringing && getByCode(upbringing, UPBRINGINGS).attribute
	const favored_skills = SKILL_DEFINITIONS
		.filter(skill => skill.attribute === favored_attribute)
		.map(x => x.code)

	return Object.entries(focuses).reduce((accumulator, [skill, focuses]) => {
		const favored = favored_skills.includes(skill as SkillCode)
		const focusCost = favored ? 50 : 100
		return accumulator + focusCost * focuses.length
	}, 0)
}
