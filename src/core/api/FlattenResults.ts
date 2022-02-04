import { UpdateCharacterProps } from "@core/utils/UpdateCharacter"

export function flattenResults(results: Array<UpdateCharacterProps>) {
	return results.reduce((previous, current) => {
		const merging = {
			...previous
		}
		const key = Object.keys(current)[0]
		switch (key) {
			case "unset":
				merging[key] = mergeArrays(previous[key], current[key])
				break
			case "set":
			case "push":
			case "pull":
				merging[key] = mergeObjects(previous[key], current[key])
				break
		}
		return merging
	})
}

const mergeObjects = (obj1?: object, obj2?: object) =>
	obj1 === undefined ? obj2 : obj2 === undefined ? obj1 : { ...obj1, ...obj2 }
const mergeArrays = (arr1?: any[], arr2?: any[]) =>
	arr1 === undefined ? arr2 : arr2 === undefined ? arr1 : [...arr1, ...arr2]
