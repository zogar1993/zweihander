import { Talent } from "@core/domain/Talent"
import { Trait } from "@web/components/ancestry/AncestryTraitCard"
import TraitCard from "@web/components/card/TraitCard"
import Grid from "@web/components/general/Grid"
import React from "react"

export default function TalentsScreen({ talents }: { talents: Array<Talent> }) {
	return (
		<section>
			<Grid columns={3}>
				{talents.map((trait: Trait) => (
					<TraitCard key={trait.name} trait={trait} />
				))}
			</Grid>
		</section>
	)
}