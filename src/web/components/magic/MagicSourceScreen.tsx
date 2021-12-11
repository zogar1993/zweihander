import { MagicSchool } from "@core/domain/MagicSchool"
import { MagicSource } from "@core/domain/MagicSource"
import theme from "@web/theme/theme"
import React from "react"
import styled from "styled-components"

export type MagicSourceScreenProps = {
	source: MagicSource
	school: MagicSchool
}

export const Title = styled.h3`
	font-size: 34px;
	text-align: center;
	color: black;
	text-transform: capitalize;
	font-family: ${theme.fonts.title};
`

export const SourceContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: ${theme.spacing.separation};
`

//TODO refactor this file
