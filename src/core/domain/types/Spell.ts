export type Spell = {
	name: string
	code: string
	school: string
	principle: Principle
	description: string
	distance: string
	distance_tag: string
	reagents: string
	duration: string
	effect: string
	critical_success: string
	critical_failure: string
}

type Principle = "Petty" | "Lesser" | "Greater"
