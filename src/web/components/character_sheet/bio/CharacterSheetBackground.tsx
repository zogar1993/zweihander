import CharacterSheetAncestry from "@web/components/character_sheet/bio/CharacterSheetAncestry"
import CharacterSheetProfessions from "@web/components/character_sheet/bio/CharacterSheetProfessions"
import { SEXES, SOCIAL_CLASSES, UPBRINGINGS } from "@web/components/character_sheet/bio/Constants"
import {
	ActionType,
	useCharacterSheetDispatcher,
	useCharacterSheetState
} from "@web/components/character_sheet/CharacterSheetContext"
import useIsCharacterSheetOwner from "@web/components/character_sheet/hooks/UseIsCharacterSheetOwner"
import theme from "@web/theme/theme"
import { Avatar, Field } from "misevi"
import React from "react"
import styled from "styled-components"

export default function CharacterSheetBackground() {
	const { character, orderAlignments, chaosAlignments } =
		useCharacterSheetState()
	const isOwner = useIsCharacterSheetOwner()

	const dispatch = useCharacterSheetDispatcher()
	return (
		<CharacterBackgroundContainer aria-label="Background">
			<AvatarContainer>
				<Avatar
					src={character.avatar || "/characters/bandit.png"}
					alt="Avatar"
					resizes={[70 * 2, 143 * 2]}
					onChange={(_, [thumbnail, avatar]) =>
						dispatch({
							type: ActionType.SetAvatar,
							payload: { avatar, thumbnail }
						})
					}
					disabled={!isOwner}
				/>
				<FlexColumn>
					<Field
						label="Name"
						value={character.name}
						onBlur={value =>
							dispatch({ type: ActionType.SetName, payload: value })
						}
						disabled={!isOwner}
					/>
					<SexAgeContainer>
						<Field
							type="combobox"
							label="Sex"
							options={SEXES}
							value={character.sex}
							onChange={value =>
								dispatch({ type: ActionType.SetSex, payload: value })
							}
							disabled={!isOwner}
						/>
						<Field
							type="number"
							label="Age"
							value={character.age}
							min={0}
							onBlur={value =>
								dispatch({ type: ActionType.SetAge, payload: value })
							}
							disabled={!isOwner}
						/>
					</SexAgeContainer>
					<Field
						type="combobox"
						label="Social Class"
						options={SOCIAL_CLASSES}
						value={character.social_class}
						onChange={value =>
							dispatch({ type: ActionType.SetSocialClass, payload: value })
						}
						disabled={!isOwner}
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
				disabled={!isOwner}
			/>
			<CharacterSheetAncestry />
			<CharacterSheetProfessions />
			<TwoColumns>
				<Field
					type="combobox"
					label="Order Alignment"
					options={orderAlignments}
					value={character.order_alignment}
					onChange={value =>
						dispatch({ type: ActionType.SetOrderAlignment, payload: value })
					}
					disabled={!isOwner}
				/>
				<Field
					type="combobox"
					label="Chaos Alignment"
					options={chaosAlignments}
					value={character.chaos_alignment}
					onChange={value =>
						dispatch({ type: ActionType.SetChaosAlignment, payload: value })
					}
					disabled={!isOwner}
				/>
			</TwoColumns>
		</CharacterBackgroundContainer>
	)
}

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

const SexAgeContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 40px;
	gap: ${theme.spacing.separation};
`

const CharacterBackgroundContainer = styled.section`
	grid-area: background;
	display: flex;
	flex-direction: column;
	gap: ${theme.spacing.separation};
`

const TwoColumns = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: ${theme.spacing.separation};

	@media (max-width: 768px) {
		grid-template-columns: 1fr;
	}
`
