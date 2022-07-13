import { withPageAuthRequired } from "@auth0/nextjs-auth0"

export default withPageAuthRequired(() => {
	return <img src="party.jpg" alt="pc party" />
})

//BUGS
//TODO fix hermanos macana are darker when delete

//CODE QUALITY
//TODO add test for magics
//TODO add test for ancestries
//TODO add tests for missing character sheet calculations
//TODO add test for react avatar and thumbnail

//AUTH & SECURITY
//TODO remove visibility of emails
//TODO add confirmation to create and authorise an account
//TODO check best practices for production ready gmail account

//STYLING
//TODO restyle character screen
//TODO make characters screen prettier

//ENCICLOPEDIA FEATURES
//TODO add creatures
//TODO add weapons

//CHARACTER SHEET NEW FEATURES
//TODO add book distinction
//TODO add alternative mercy

//CHARACTER SHEET STABILITY
//TODO handle responses for failures
//TODO add undo on react for failing server changes

//CHARACTER SHEET QOL
//TODO transfer a character

//CHARACTER SHEET RULEBOOK STRICTNESS
//TODO make hierarchies of talents for professions
//TODO check for strict experience expenditure
//TODO add same profession free talents
//TODO make full wildcard possible

//PAGE FEATURES
//TODO do changelog on homepage
