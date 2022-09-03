import CharacterSheetAncestry from "@web/components/character_sheet/bio/CharacterSheetAncestry"
import CharacterSheetProfessions from "@web/components/character_sheet/bio/CharacterSheetProfessions"
import { SEXES, SOCIAL_CLASSES, UPBRINGINGS } from "@web/components/character_sheet/bio/Constants"
import { useCharacterSheetState } from "@web/components/character_sheet/CharacterSheetContext"
import useSetCharacterAge from "@web/components/character_sheet/hooks/update/useSetCharacterAge"
import useSetCharacterAvatar from "@web/components/character_sheet/hooks/update/useSetCharacterAvatar"
import useSetCharacterChaosAlignment from "@web/components/character_sheet/hooks/update/useSetCharacterChaosAlignment"
import useSetCharacterName from "@web/components/character_sheet/hooks/update/useSetCharacterName"
import useSetCharacterOrderAlignment from "@web/components/character_sheet/hooks/update/useSetCharacterOrderAlignment"
import useSetCharacterSex from "@web/components/character_sheet/hooks/update/useSetCharacterSex"
import useSetCharacterSocialClass from "@web/components/character_sheet/hooks/update/useSetCharacterSocialClass"
import useSetCharacterUpbringing from "@web/components/character_sheet/hooks/update/useSetCharacterUpbringing"
import useIsCharacterSheetOwner from "@web/components/character_sheet/hooks/UseIsCharacterSheetOwner"
import theme from "@web/theme/theme"
import { Avatar, Field } from "misevi"
import React from "react"
import styled from "styled-components"

export default function CharacterSheetBackground() {
	const { character, orderAlignments, chaosAlignments } =
		useCharacterSheetState()
	const isOwner = useIsCharacterSheetOwner()
	const setAvatar = useSetCharacterAvatar()
	const setName = useSetCharacterName()
	const setSex = useSetCharacterSex()
	const setAge = useSetCharacterAge()
	const setSocialClass = useSetCharacterSocialClass()
	const setUpbringing = useSetCharacterUpbringing()
	const setOrderAlignment = useSetCharacterOrderAlignment()
	const setChaosAlignment = useSetCharacterChaosAlignment()

	return (
		<CharacterBackgroundContainer aria-label="Background">
			<AvatarContainer>
				<Avatar
					src={character.avatar || "/characters/bandit.png"}
					alt="Avatar"
					resizes={[70 * 2, 143 * 2]}
					onChange={(_, [thumbnail, avatar]) => setAvatar({ avatar, thumbnail })}
					disabled={!isOwner}
				/>
				<FlexColumn>
					<Field
						label="Name"
						value={character.name}
						onBlur={setName}
						disabled={!isOwner}
					/>
					<SexAgeContainer>
						<Field
							type="combobox"
							label="Sex"
							options={SEXES}
							value={character.sex}
							onChange={setSex}
							disabled={!isOwner}
						/>
						<Field
							type="number"
							label="Age"
							value={character.age}
							min={0}
							onBlur={setAge}
							disabled={!isOwner}
						/>
					</SexAgeContainer>
					<Field
						type="combobox"
						label="Social Class"
						options={SOCIAL_CLASSES}
						value={character.social_class}
						onChange={setSocialClass}
						disabled={!isOwner}
					/>
				</FlexColumn>
			</AvatarContainer>
			<Field
				type="combobox"
				label="Upbringing"
				options={UPBRINGINGS}
				value={character.upbringing}
				onChange={setUpbringing}
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
					onChange={setOrderAlignment}
					disabled={!isOwner}
				/>
				<Field
					type="combobox"
					label="Chaos Alignment"
					options={chaosAlignments}
					value={character.chaos_alignment}
					onChange={setChaosAlignment}
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
