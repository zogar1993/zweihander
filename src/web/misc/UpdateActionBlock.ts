import { UpdateAction } from "@api/character/[id]/update"

export type UpdateActionBlock = [UpdateAction["action"], string, any?]

export const blocksToObjects = (blocks: Array<UpdateActionBlock>) =>
	blocks.map(([action, property, value]) =>
		value ? { action, property, value } : { action, property }
	)
