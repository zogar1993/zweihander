import { AttributeCode } from "@core/domain/attribute/AttributeCode"
import { SkillCode } from "@core/domain/skill/SkillCode"

export const SKILL_DEFINITIONS: ReadonlyArray<SkillDefinition> = Object.freeze(
	[
		{
			name: "Martial Melee",
			code: "martial_melee",
			attribute: "combat",
			special: true
		},
		{
			name: "Martial Ranged",
			code: "martial_ranged",
			attribute: "combat",
			special: true
		},
		{
			name: "Simple Melee",
			code: "simple_melee",
			attribute: "combat",
			special: false
		},
		{
			name: "Simple Ranged",
			code: "simple_ranged",
			attribute: "combat",
			special: false
		},
		{
			name: "Athletics",
			code: "athletics",
			attribute: "brawn",
			special: false
		},
		{
			name: "Drive",
			code: "drive",
			attribute: "brawn",
			special: true
		},
		{
			name: "Intimidate",
			code: "intimidate",
			attribute: "brawn",
			special: false
		},
		{
			name: "Toughness",
			code: "toughness",
			attribute: "brawn",
			special: false
		},
		{
			name: "Coordination",
			code: "coordination",
			attribute: "agility",
			special: false
		},
		{
			name: "Pilot",
			code: "pilot",
			attribute: "agility",
			special: true
		},
		{
			name: "Ride",
			code: "ride",
			attribute: "agility",
			special: true
		},
		{
			name: "Skulduggery",
			code: "skulduggery",
			attribute: "agility",
			special: true
		},
		{
			name: "Stealth",
			code: "stealth",
			attribute: "agility",
			special: false
		},
		{
			name: "Awareness",
			code: "awareness",
			attribute: "perception",
			special: false
		},
		{
			name: "Eavesdrop",
			code: "eavesdrop",
			attribute: "perception",
			special: false
		},
		{
			name: "Scrutinize",
			code: "scrutinize",
			attribute: "perception",
			special: false
		},
		{
			name: "Survival",
			code: "survival",
			attribute: "perception",
			special: false
		},
		{
			name: "Alchemy",
			code: "alchemy",
			attribute: "intelligence",
			special: true
		},
		{
			name: "Counterfeit",
			code: "counterfeit",
			attribute: "intelligence",
			special: true
		},
		{
			name: "Education",
			code: "education",
			attribute: "intelligence",
			special: true
		},
		{
			name: "Folklore",
			code: "folklore",
			attribute: "intelligence",
			special: false
		},
		{
			name: "Gamble",
			code: "gamble",
			attribute: "intelligence",
			special: false
		},
		{
			name: "Heal",
			code: "heal",
			attribute: "intelligence",
			special: true
		},
		{
			name: "Navigation",
			code: "navigation",
			attribute: "intelligence",
			special: true
		},
		{
			name: "Warfare",
			code: "warfare",
			attribute: "intelligence",
			special: true
		},
		{
			name: "Incantation",
			code: "incantation",
			attribute: "willpower",
			special: true
		},
		{
			name: "Interrogation",
			code: "interrogation",
			attribute: "willpower",
			special: true
		},
		{
			name: "Resolve",
			code: "resolve",
			attribute: "willpower",
			special: false
		},
		{
			name: "Tradecraft",
			code: "tradecraft",
			attribute: "willpower",
			special: true
		},
		{
			name: "Bargain",
			code: "bargain",
			attribute: "fellowship",
			special: false
		},
		{
			name: "Charm",
			code: "charm",
			attribute: "fellowship",
			special: false
		},
		{
			name: "Disguise",
			code: "disguise",
			attribute: "fellowship",
			special: true
		},
		{
			name: "Guile",
			code: "guile",
			attribute: "fellowship",
			special: false
		},
		{
			name: "Handle Animal",
			code: "handle_animal",
			attribute: "fellowship",
			special: true
		},
		{
			name: "Leadership",
			code: "leadership",
			attribute: "fellowship",
			special: true
		},
		{
			name: "Rumor",
			code: "rumor",
			attribute: "fellowship",
			special: false
		}
	].sort((a, b) => a.name.localeCompare(b.name))
) as Array<SkillDefinition>

export type SkillDefinition = {
	name: string
	code: SkillCode
	attribute: AttributeCode
	special: boolean
}
