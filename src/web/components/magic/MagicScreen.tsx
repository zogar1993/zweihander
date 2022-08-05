import { MagicSchool } from "@core/domain/types/MagicSchool"
import { MagicSource } from "@core/domain/types/MagicSource"
import { Spell } from "@core/domain/types/Spell"
import LinksGroup from "@web/components/general/LinksGroup"
import { PageTitle } from "@web/components/general/PageTitle"
import SpellCards from "@web/components/magic/SpellCards"
import React from "react"

export default function MagicScreen({
	source,
	school,
	spells
}: {
	source: MagicSource
	school: MagicSchool
	spells: Array<Spell>
}) {
	return (
		<>
			<PageTitle>{source.name}</PageTitle>
			{source.schools.length > 1 && (
				<LinksGroup
					items={source.schools}
					selected={school}
					path={`/magic/${source.code}`}
					columns={5}
				/>
			)}
			<SpellCards spells={spells} />
		</>
	)
}