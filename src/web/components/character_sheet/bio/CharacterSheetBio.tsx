import CharacterSheetAncestry from "@web/components/character_sheet/bio/CharacterSheetAncestry"
import CharacterSheetProfessions from "@web/components/character_sheet/bio/CharacterSheetProfessions"
import {
	SEXES,
	SOCIAL_CLASSES,
	UPBRINGINGS
} from "@web/components/character_sheet/bio/Constants"
import {
	ActionType,
	useCharacterSheetDispatcher,
	useCharacterSheetState
} from "@web/components/character_sheet/CharacterSheetContext"
import theme from "@web/theme/theme"
import { Field } from "misevi"
import Image from "next/image"
import React from "react"
import styled from "styled-components"

export default function CharacterSheetBio() {
	const { character, orderAlignments, chaosAlignments } =
		useCharacterSheetState()

	const dispatch = useCharacterSheetDispatcher()
	//TODO P0 do avatar
	return (
		<Bio>
			<Field
				label="Name"
				value={character.name}
				onBlur={value => dispatch({ type: ActionType.SetName, payload: value })}
			/>
			<AvatarContainer>
				<Avatar
					src={character.avatar || "/character/bandit.png"}
					alt="Avatar"
					width={143}
					height={143}
				/>
				<FlexColumn>
					<Field
						type="number"
						label="Age"
						value={character.age}
						min={0}
						onBlur={value =>
							dispatch({ type: ActionType.SetAge, payload: value })
						}
					/>
					<Field
						type="combobox"
						label="Sex"
						options={SEXES}
						value={character.sex}
						onChange={value =>
							dispatch({ type: ActionType.SetSex, payload: value })
						}
					/>
					<Field
						type="combobox"
						label="Social Class"
						options={SOCIAL_CLASSES}
						value={character.social_class}
						onChange={value =>
							dispatch({ type: ActionType.SetSocialClass, payload: value })
						}
					/>
				</FlexColumn>
			</AvatarContainer>
			<Field
				type="combobox"
				label="Upbringing"
				options={UPBRINGINGS}
				value={character.upbringing}
				onChange={value =>
					dispatch({ type: ActionType.SetUpbringing, payload: value })
				}
			/>
			<CharacterSheetAncestry />
			<CharacterSheetProfessions />
			<Field
				type="combobox"
				label="Order Alignment"
				options={orderAlignments}
				value={character.order_alignment}
				onChange={value =>
					dispatch({ type: ActionType.SetOrderAlignment, payload: value })
				}
			/>
			<Field
				type="combobox"
				label="Chaos Alignment"
				options={chaosAlignments}
				value={character.chaos_alignment}
				onChange={value =>
					dispatch({ type: ActionType.SetChaosAlignment, payload: value })
				}
			/>
		</Bio>
	)
}

const Avatar = styled(Image)`
	border-radius: ${theme.borders.radius};
	width: 143px;
	height: 143px;
`

const AvatarContainer = styled.div`
	display: grid;
	grid-template-columns: 143px 1fr;
	gap: ${theme.spacing.separation};
`

const FlexColumn = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${theme.spacing.separation};
`

const Bio = styled.div`
	grid-area: bio;
	display: flex;
	flex-direction: column;
	gap: ${theme.spacing.separation};
`
