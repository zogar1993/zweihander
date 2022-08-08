export default function Homepage() {
	return (
		<>
			<img src="party.jpg" alt="pc party" />
			<h2>Changelog</h2>
			<ul>
				<li>- 20220729 - BUGFIX now generalist magic spells detail show correctly when spell card is clicked</li>
				<li>- 20220730 - BUGFIX now it does not seem like you can edit condition trackers when you are not the owner if
					the character sheet
				</li>
				<li>- 20220802 - STYLE now profession tiers always show, which means they no longer cause layout shifts</li>
				<li>- 20220802 - STYLE now profession tiers show the name of the items instead of the code</li>
				<li>- 20220802 - FEATURE now experience spent outside of profession is listed under unique advances</li>
				<li>- 20220803 - STYLE talents are now interactive on tiers and were removed from the accordion</li>
				<li>- 20220804 - FEATURE duplicated talents are now turned into comboboxes so that you can select any talent you
					do not possess
				</li>
				<li>- 20220804 - BUGFIX talent options for repeated talents now take into consideration unselected talents</li>
				<li>- 20220804 - FEATURE new character sheet experience is calculated according to the rulebook</li>
				<li>- 20220805 - FEATURE now controls inside of tiers and unique advances are interactive</li>
				<li>- 20220808 - BUGFIX now character sheet journal displays its content properly</li>
				<li>- 20220808 - ACCESSIBILITY now character sheet trackers have accessible radiogroup roles</li>
			</ul>
		</>
	)
}
