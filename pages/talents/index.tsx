import getTalents from "@core/actions/GetTalents"
import { Talent } from "@core/domain/Talent"
import { Trait } from "@web/components/ancestry/AncestryTraitCard"
import SpecialRuleCard from "@web/components/card/SpecialRuleCard"
import Grid from "@web/components/general/Grid"
import React from "react"

export default function AncestriesScreen({ talents }: { talents: Array<Talent> }) {
	return (
		<section>
			<Grid columns={3}>
				{talents.map((trait: Trait) => (
					<SpecialRuleCard key={trait.name} trait={trait} />
				))}
			</Grid>
		</section>
	)
}

export async function getStaticProps() {
	const talents = await getTalents()
	return { props: { talents: talents } }
}