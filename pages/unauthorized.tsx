import { useRouter } from "next/router"
import styled from "styled-components"

export default function Unauthorized() {
	const { query } = useRouter()
	const { user, contact } = query
	return (
		<Container>
			<span>
				This character sheet generator and rules compendium for ZWEIHÄNDER Grim
				& Perilous RPG is private.
			</span>
			<span>User {user} has no access.</span>
			<span>Feel free to contact ${contact} if you are interested!</span>
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
`
