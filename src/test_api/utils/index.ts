import handler from "@api/character/[id]/[[...path]]"
import * as UpdateCharacter from "@core/utils/UpdateCharacter"
import { NextApiRequest, NextApiResponse } from "next"

export const CHARACTER_ID = "an_id"

export async function call_character_sheet_api(request: NextApiRequest) {
	const result = {
		status(code: number) {
			this.statusCode = code
		}
	} as NextApiResponse
	await handler(request, result)
	return result
}

export function character_sheet_request(
	method: string,
	path: Array<string>,
	body: any
) {
	return {
		method: "PUT",
		query: {
			id: CHARACTER_ID,
			path: path
		},
		body: body
	} as unknown as NextApiRequest
}

export const updateCharacterSpy = jest.spyOn(UpdateCharacter, "default")

export function expect_character_to_be_updated_with(
	change: Record<string, any>
) {
	const call = updateCharacterSpy.mock.calls[0]
	expect(call[0]).toStrictEqual(CHARACTER_ID)
	expect(call[1]).toStrictEqual(change)
}