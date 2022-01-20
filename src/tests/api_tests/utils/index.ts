import handler, { UpdateAction } from "@api/character/[id]/update"
import * as GetAncestries from "@core/actions/GetAncestries"
import * as UpdateCharacter from "@core/utils/UpdateCharacter"
import { UpdateCharacterProps } from "@core/utils/UpdateCharacter"
import { blocksToObjects, UpdateActionBlock } from "@web/misc/UpdateActionBlock"
import { NextApiRequest, NextApiResponse } from "next"
import { TEST_ANCESTRIES } from "../../web_tests/character_sheet_reducer/utils/collections"

export const updateCharacterSpy = jest.spyOn(UpdateCharacter, "default")
export const getAncestries = jest.spyOn(GetAncestries, "default")

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

export async function update_character(...body: Array<UpdateActionBlock>) {
	updateCharacterSpy.mockReset()
	updateCharacterSpy.mockReturnValue(Promise.resolve())
	getAncestries.mockReset()
	getAncestries.mockReturnValue(Promise.resolve(TEST_ANCESTRIES))
	const request = {
		method: "POST",
		query: {
			id: CHARACTER_ID
		},
		body: JSON.stringify(blocksToObjects(body))
	} as unknown as NextApiRequest
	const result = {
		status(code: number) {
			this.statusCode = code
			return result
		},
		json(body: any) {
			this.body = body
			return result
		}
	} as any as NextApiResponse
	await handler(request, result)
	return result
}

export function character_sheet_request(body: Array<UpdateAction>) {
	return {
		method: "POST",
		query: {
			id: CHARACTER_ID
		},
		body: JSON.stringify(body)
	} as unknown as NextApiRequest
}

export function expect_character_to_have_attribute_set(
	change: Record<string, any>
) {
	expect_character_to_have_changed({ set: change })
}

export function expect_character_to_have_item_added(
	change: Record<string, any>
) {
	expect_character_to_have_changed({ push: change })
}

export function expect_character_to_have_item_removed(
	change: Record<string, any>
) {
	expect_character_to_have_changed({ pull: change })
}

export function expect_character_to_have_property_deleted(change: string) {
	expect_character_to_have_changed({ unset: [change] })
}

export function expect_character_to_have_changed(change: UpdateCharacterProps) {
	const call = updateCharacterSpy.mock.calls[0]
	expect(call[0]).toStrictEqual(CHARACTER_ID)
	expect(call[1]).toStrictEqual(change)
}

export function expect_character_to_be_unchanged() {
	expect(updateCharacterSpy.mock.calls.length).toBe(0)
}
