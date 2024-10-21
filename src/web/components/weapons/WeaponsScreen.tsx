import { Weapon } from "@core/domain/types/Weapon";
import WeaponCard from "@web/components/card/WeaponCard";
import Grid from "@web/components/general/Grid";
import React, { useState } from "react";

export default function WeaponsScreen({ weapons }: { weapons: ReadonlyArray<Weapon> }) {
	const [originalWeapons] = useState(weapons);
	const [filter, setFilter] = useState<{ type?: string; quality?: string }>({});

	const filteredWeapons = originalWeapons.filter((weapon) => {
		const matchesType = !filter.type || weapon.type.includes(filter.type);
		const matchesQuality = !filter.quality || weapon.qualities.includes(filter.quality);
		return matchesType && matchesQuality;
	});

	const handlePropertyClick = (filterType: string, filterValue: string) => {
		setFilter({ [filterType]: filterValue });
	};

	const clearFilter = () => {
		setFilter({});
	};

	return (
		<section>
			{(filter.type || filter.quality) && (
				<button onClick={clearFilter}>Remove Filter</button>
			)}

			<Grid columns={3}>
				{filteredWeapons.map((weapon: Weapon) => (
					<WeaponCard key={weapon.name} weapon={weapon} onPropertyClick={handlePropertyClick} />
				))}
			</Grid>
		</section>
	);
}