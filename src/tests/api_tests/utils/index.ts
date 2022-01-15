import handler, { UpdateAction } from "@api/character/[id]/update"
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

export function character_sheet_request(body: Array<UpdateAction>) {
	return {
		method: "POST",
		query: {
			id: CHARACTER_ID
		},
		body: body
	} as unknown as NextApiRequest
}

export const updateCharacterSpy = jest.spyOn(UpdateCharacter, "default")

export function expect_character_to_have_attribute_set(
	change: Record<string, any>
) {
	const call = updateCharacterSpy.mock.calls[0]
	expect(call[0]).toStrictEqual(CHARACTER_ID)
	expect(call[1]).toStrictEqual({ set: change })
}

export function expect_character_to_have_item_added(
	change: Record<string, any>
) {
	const call = updateCharacterSpy.mock.calls[0]
	expect(call[0]).toStrictEqual(CHARACTER_ID)
	expect(call[1]).toStrictEqual({ push: change })
}

export function expect_character_to_have_item_removed(
	change: Record<string, any>
) {
	const call = updateCharacterSpy.mock.calls[0]
	expect(call[0]).toStrictEqual(CHARACTER_ID)
	expect(call[1]).toStrictEqual({ pull: change })
}

export function expect_character_to_have_property_deleted(
	change: string
) {
	const call = updateCharacterSpy.mock.calls[0]
	expect(call[0]).toStrictEqual(CHARACTER_ID)
	expect(call[1]).toStrictEqual({ unset: [change] })
}
