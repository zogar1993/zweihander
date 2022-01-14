import { Spell } from "@core/domain/Spell"
import Grid from "@web/components/general/Grid"
import SpellCard from "@web/components/magic/SpellCard"
import React from "react"

export default function SpellCards({ spells }: Props) {
	return (
		<Grid columns={3} mobile-columns={1}>
			{spells.map(spell => (
				<SpellCard spell={spell} key={spell.code} />
			))}
		</Grid>
	)
}

type Props = {
	spells: Array<Spell>
}
