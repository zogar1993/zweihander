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
    display: flex;
		flex-wrap: wrap;
    gap: 8px 16px; 
    font-size: 16px;
    color: black;

    dt {
        font-weight: bold;
    }

    dd {
        margin-left: 0;
    }
`;

const ClickableSpan = styled.span`
	color: blue;
	cursor: pointer;
	text-decoration: underline;
	margin-right: 0.5rem;
`;

const WeaponPropertiesStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: 1px solid lightgray;
  padding: 8px;
  border-radius: 4px;
  flex-basis: calc(50% - 8px);
  box-sizing: border-box;
`;

function WeaponProperties({ name, children }: PropertyProps) {
	return (
		<WeaponPropertiesStyle>
			<dt>{name}:</dt>
			<dd>{children}</dd>
		</WeaponPropertiesStyle>
	);
}

type PropertyProps = {
	name: string;
	children: React.ReactNode;
};