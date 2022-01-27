import { UpdateAction } from "@api/character/[id]/update"

export type UpdateActionBlock = Readonly<[UpdateAction["action"], string, any?]>

export const blocksToObjects = (blocks: Array<UpdateActionBlock>) =>
	blocks.map(([action, property, value]) =>
		value === undefined ? { action, property } : { action, property, value }
	)
