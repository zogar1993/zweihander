import { useCharacterSheet } from "@web/components/character_sheet/CharacterSheetContext"
import Grid from "@web/components/general/Grid"
import theme from "@web/theme/theme"
import { Field } from "misevi"
import Image from "next/image"
import React from "react"
import styled from "styled-components"

export default function CharacterSheetBio() {
	const character = useCharacterSheet()
	return (
		<Bio>
			<Field label="Name" value={character.name} />
			<AvatarContainer>
				<Avatar
					src={character.avatar || "/character/bandit.png"}
					alt="Avatar"
					width={143}
					height={143}
				/>
			</AvatarContainer>
			<Grid columns={1}>
				<Field
					type="combobox"
					label="Sex"
					options={sexes}
					value={character.sex}
				/>
				<Field type="number" label="Age" value={character.age} min={0} />
				<Field
					type="combobox"
					label="Social Class"
					value={character.social_class}
				/>
				<Field
					type="combobox"
					label="Upbringing"
					options={[]}
					value={character.upbringing}
				/>
				<Field
					type="combobox"
					label="Order Alignment"
					options={[]}
					value={character.order_alignment}
				/>
				<Field
					type="combobox"
					label="Chaos Alignment"
					options={[]}
					value={character.chaos_alignment}
				/>
			</Grid>
		</Bio>
	)
}

const Avatar = styled(Image)`
	border-radius: ${theme.borders.radius};
	width: 143px;
	height: 143px;
`

const AvatarContainer = styled.div`
	display: flex;
`

const Bio = styled.div`
	grid-area: bio;
	display: flex;
	flex-direction: column;
	gap: ${theme.spacing.separation};
`


const sexes = [
	{name: "Male", code: "male"},
	{name: "Female", code: "female"},
	{name: "Other", code: "other"}
]
const socialClasses = [
	{name: "Lowborn", code: "lowborn"},
	{name: "Bourgeois", code: "bourgeois"},
	{name: "Aristocrat", code: "aristocrat"}
]