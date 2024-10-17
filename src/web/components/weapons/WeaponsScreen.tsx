import { Weapon } from "@core/domain/types/Weapon"
import WeaponCard from "@web/components/card/WeaponCard"
import Grid from "@web/components/general/Grid"
import React from "react"

export default function WeaponsScreen({ weapons }: { weapons: ReadonlyArray<Weapon> }) {
	return (
		<section>
			<Grid columns={3}>
				{weapons.map((weapon: Weapon) => (
					<WeaponCard key={weapon.name} weapon={weapon} />
				))}
			</Grid>
		</section>
	)
}