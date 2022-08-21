import { UpdateAction } from "@api/characters/[id]/update"


export function validateActionCompatibility(actions: ReadonlyArray<UpdateAction>) {
	const properties = [...new Set(actions.map(x => x.property))]
	//We group actions by property name
	let results = properties.map(property => actions.filter(action => action.property === property))
	//We exclude properties with one action
	results = results.filter(actions => actions.length > 1)
	//We exclude properties which just combine "add_to_array" and "remove_from_array"
	return results.filter(actions => !(
		actions.length === 2 &&
		actions.some(action => action.action === "add_to_array") &&
		actions.some(action => action.action === "remove_from_array")
	))
}