import { AncestryTech, AncestryTraitTech } from "@core/domain/character_sheet/CharacterSheet"
import { getByCode } from "@core/domain/general/GetByCode"


export default function calculateAncestryTraits(
	ancestry: string | null,
	ancestries: Array<AncestryTech>
): Array<AncestryTraitTech> {
	return ancestry === null ? [] : getByCode(ancestry, ancestries).traits
}