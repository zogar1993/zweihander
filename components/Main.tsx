import React, {ReactNode} from "react"
import styled from 'styled-components'
import Menu, {MenuItem} from "./Menu"

export type MainProps = {
	logo: any
	screens: Array<MenuItem>
	children: ReactNode
}

export default function Main({ screens, children, ...props }: MainProps) {
	return (
		<React.StrictMode>
			<PageContent>
				<Menu {...props} menu={screens} />
				<Section>
					{children}
				</Section>
			</PageContent>
		</React.StrictMode>
	)
}

const PageContent = styled.div`
  display: flex;
  width: 100%;
  height: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const Section = styled.section`
  flex-grow: 1;
  flex-shrink: 1;
  height: 100vh;

  padding: 8px 4px 4px;

  overflow-y: auto;

  display: flex;
  flex-direction: column;
  align-items: center;
`

