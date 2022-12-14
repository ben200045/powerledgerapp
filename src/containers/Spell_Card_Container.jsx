import React from "react";
import Spell_Card from "../components/Spell_Card";
import styles from "../css/Frame_Container.module.css";
import axios from "axios";

export default class Spell_Card_Container extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			spell_cards: [],
			isLoaded: false,
			favouritedSpells: [],
		};
	}

	componentDidMount() {
		this.props.favourites
			? this.setState({ isLoaded: true })
			: axios
					.get("https://www.dnd5eapi.co/api/spells")
					.then((res) => res.data)
					.then((json) => {
						this.setState({
							isLoaded: true,
							spell_cards: json,
						});
					})
					.catch((err) => {
						console.log(err);
					});
	}

	render() {
		if (this.props.favourites && this.props.favouritedSpells.length === 0) {
			return <div className={styles.spell_cardlist_ini}>No Favourites yet</div>;
		}

		const { spell_cards, isLoaded } = this.state;
		if (!isLoaded) {
			return <div className={styles.spell_cardlist_ini}>Loading...</div>;
		} else {
			return (
				<div className={styles.spell_cardlist}>
					{this.props.favourites
						? this.props.favouritedSpells.map((spell) => (
								<Spell_Card
									key={spell.url}
									{...spell}
									getSpellDetails={this.props.getSpellDetails}
								/>
						  ))
						: spell_cards.results.map((spell_card) => (
								<Spell_Card
									key={spell_cards.results.indexOf(spell_card)}
									{...spell_card}
									getSpellDetails={this.props.getSpellDetails}
								/>
						  ))}
				</div>
			);
		}
	}
}
