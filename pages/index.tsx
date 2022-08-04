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
					do not posess
				</li>
			</ul>
		</>
	)
}
