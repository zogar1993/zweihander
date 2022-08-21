import { MagicSchool } from "./MagicSchool"

export type MagicSource = {
	name: string
	code: string
	icon: any
	schools: ReadonlyArray<MagicSchool>
}
