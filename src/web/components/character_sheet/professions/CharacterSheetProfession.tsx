import Grid from "@web/components/general/Grid"
import theme from "@web/theme/theme"
import { CheckButton } from "misevi"
import React from "react"
import styled from "styled-components"

export default function CharacterSheetProfession() {
	return (
		<Container>
			<Title>Basic Tier</Title>
			<Grid columns={2}>
				<Column>
					<Title>Profession</Title>
					<CheckButton text={"Adherent"} checked={false} />
					<Title>Attributes</Title>
					<CheckButton text={"Brawn"} checked={false} />
					<CheckButton text={"Brawn"} checked={false} />
					<CheckButton text={"Brawn"} checked={true} />
					<CheckButton text={"Brawn"} checked={false} />
					<CheckButton text={"Brawn"} checked={false} />
					<CheckButton text={"Brawn"} checked={false} />
					<CheckButton text={"Brawn"} checked={false} />
				</Column>
				<Column>
					<Title>Skills</Title>
					<CheckButton text={"Martial Melee"} checked={false} />
					<CheckButton text={"Martial Melee"} checked={false} />
					<CheckButton text={"Martial Melee"} checked={false} />
					<CheckButton text={"Martial Melee"} checked={false} />
					<CheckButton text={"Martial Melee"} checked={true} />
					<CheckButton text={"Martial Melee"} checked={false} />
					<CheckButton text={"Martial Melee"} checked={false} />
					<CheckButton text={"Martial Melee"} checked={false} />
					<CheckButton text={"Martial Melee"} checked={false} />
					<CheckButton text={"Martial Melee"} checked={false} />
				</Column>
			</Grid>
			<Title>Talents</Title>
			<CheckButton text={"Martial Melee"} checked={false} />
			<CheckButton text={"Martial Melee"} checked={false} />
			<CheckButton text={"Martial Melee"} checked={false} />
		</Container>
	)
}

const Container = styled.div`
	grid-area: profession1;
	display: flex;
	flex-direction: column;
	gap: ${theme.spacing.separation};
	align-items: center;
	border: ${theme.spacing.separation} solid ${theme.colors.border};
	padding: ${theme.spacing.padding};
	gap: ${theme.spacing.separation};
	border-radius: ${theme.borders.radius};
	display: none;
`

const Title = styled.span`
	padding: ${theme.spacing.separation};
	font-size: 20px;
	justify-self: center;
`

const Column = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${theme.spacing.separation};
`
