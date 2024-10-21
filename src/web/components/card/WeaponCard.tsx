import { Weapon } from "@core/domain/types/Weapon"
import { Card } from "@web/components/card/Card"
import { CardTitle } from "@web/components/card/CardTitle"
import React from "react"
import styled from "styled-components"

export default function WeaponCard({ weapon, onPropertyClick, }: {
	weapon: Weapon; onPropertyClick: (filterType: string, filterValue: string) => void;
}) {
	return (
		<Card aria-label={weapon.name}>
			<CardTitle>{weapon.name}</CardTitle>
			<PropertyList>
				<WeaponProperties name="Load">{weapon.load}</WeaponProperties>
				<WeaponProperties name="Handling">{weapon.handling.join(", ")}</WeaponProperties>
				<WeaponProperties name="Distance">{weapon.distance.join(", ")}</WeaponProperties>
				<WeaponProperties name="Qualities">
					{weapon.qualities.map((quality) => (
						<ClickableSpan
							key={quality}
							onClick={() => onPropertyClick("quality", quality)}
						>
							{quality}
						</ClickableSpan>
					))}
				</WeaponProperties>
				<WeaponProperties name="Type">
					{weapon.type.map((type) => (
						<ClickableSpan
							key={type}
							onClick={() => onPropertyClick("type", type)}
						>
							{type}
						</ClickableSpan>
					))}
				</WeaponProperties>
				<WeaponProperties name="Encumbrance">{weapon.encumbrance}</WeaponProperties>
				<WeaponProperties name="Price">{weapon.price}</WeaponProperties>
			</PropertyList>
		</Card>
	);
}

const PropertyList = styled.dl`
    font-size: 16px;
    color: black;
    dt {
        font-weight: bold;
    }
    dd {
        margin-left: 1rem;
    }
`;

const ClickableSpan = styled.span`
	color: blue;
	cursor: pointer;
	text-decoration: underline;
	margin-right: 0.5rem;
`;

function WeaponProperties({ name, children }: PropertyProps) {
	return (
		<>
			<dt>{name}:</dt>
			<dd>{children}</dd>
		</>
	);
}

type PropertyProps = {
	name: string;
	children: React.ReactNode;
};