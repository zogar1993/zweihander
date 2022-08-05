import { Talent } from "@core/domain/Talent"
import React from "react"
import styled from "styled-components"

export default function TalentsScreen({ talents }: { talents: Array<Talent> }) {
	return (
		<section>
			<WepCardBlock>
				{weapons.map((weapons: any) => (
                    <WepCard>
                     <WepCardTitle>
                        {weapons.name}
                     </WepCardTitle>
                     <WepCardInfo>
                        <li>Load: {weapons.load}</li>
                        <li>Handling: {weapons.handling}</li>
                        <li>Distance: {weapons.distance}</li>
                        <li>Qualities: {weapons.qualities.join(", ")}</li>
                        <li>Type: {weapons.type}</li>
                        <li>Encumberance: {weapons.encumbrance}</li>
                        <li>Price: {weapons.price}</li>
                        <li>Skills: {weapons.skill}</li>
                     </WepCardInfo>
                    </WepCard>
				))}
			</WepCardBlock>
		</section>
	)
}


const WepCardBlock = styled.div`
   display: flex;
   flex-flow: row wrap;
   justify-content: flex-start;
   padding: 32px;
   gap:20px;
`

const WepCard = styled.div`
   flex-basis: 16%;
   border: 1px solid #eee;
   box-shadow: 2px 4px 16px rgba(0,0,0,.06);
   border-radius: 4px; 
   font-family:Roboto, sans-serif;
   font-size:small;
   font-weight: 500;
   text-orientation:upright;
   padding: 5px;
   display: flex;
   flex-direction: column;
`
const WepCardTitle = styled.h5`
   font-family:Roboto, sans-serif;
   font-size:15px;
   font-weight: bolder;
   text-orientation:upright;
   margin:5px;
`
const WepCardInfo = styled.p`
   font-family:Roboto, sans-serif;
   font-size:small;
   font-weight: 500;
   text-orientation:upright;
   list-style: none;
   margin:5px;
`
const weapons = [
    {
       "name":"Blackjack",
       "load":0,
       "handling":[1],
       "distance":[
          "Engaged"
       ],
       "qualities":[
          "Powerful",
          "Pummeling"
       ],
       "type":[
          "Brawling"
       ],
       "alternative_damage":"CB",
       "encumbrance":1,
       "price":"2ss",
       "skill":"Simple melee",
       "book":"Zweihänder"
    },
    {
       "name":"Bullwhip",
       "load":0,
       "handling":[
          1
       ],
       "distance":[
          "Engaged",
          "1 yard"
       ],
       "qualities":[
          "Entangling",
          "Ineffective",
          "Reach"
       ],
       "type":[
          "Brawling"
       ],
       "alternative_damage":"NONE",
       "encumbrance":1,
       "price":"5ss",
       "skill":"Simple melee",
       "book":"Zweihänder"
    },
    {
       "name":"Cudgel",
       "load":0,
       "handling":[
          1
       ],
       "distance":[
          "Engaged"
       ],
       "qualities":[
          "Light",
          "Powerful",
          "Weak"
       ],
       "type":[
          "Crushing"
       ],
       "alternative_damage":"CB",
       "encumbrance":1,
       "price":"5ss",
       "skill":"Simple melee",
       "book":"Zweihänder"
    },
    {
       "name":"Dirk",
       "load":0,
       "handling":[
          1
       ],
       "distance":[
          "Engaged"
       ],
       "qualities":[
          "Fast",
          "Finesse",
          "Light",
          "Weak"
       ],
       "type":[
          "Bladed"
       ],
       "alternative_damage":"AB",
       "encumbrance":1,
       "price":"5ss",
       "skill":"Simple melee",
       "book":"Zweihänder"
    },
    {
       "name":"Fire-Hardened Spear",
       "load":0,
       "handling":[
          1,
          2
       ],
       "distance":[
          "Engaged",
          "1 yard"
       ],
       "qualities":[
          "Adaptable",
          "Reach",
          "Weak"
       ],
       "type":[
          "Bladed"
       ],
       "alternative_damage":"CB+1",
       "encumbrance":2,
       "price":"7ss",
       "skill":"Simple melee",
       "book":"Zweihänder"
    },
    {
       "name":"Garrote",
       "load":0,
       "handling":[
          2
       ],
       "distance":[
          "Engaged"
       ],
       "qualities":[
          "Entangling",
          "Fast",
          "Ineffective"
       ],
       "type":[
          "Brawling"
       ],
       "alternative_damage":"NONE",
       "encumbrance":1,
       "price":"2ss",
       "skill":"Simple melee",
       "book":"Zweihänder"
    },
    {
       "name":"Improvised Hand Weapon",
       "load":0,
       "handling":[
          1
       ],
       "distance":[
          "Engaged"
       ],
       "qualities":[
          "Pummeling"
       ],
       "type":[
          "Varies"
       ],
       "alternative_damage":"BB",
       "encumbrance":1,
       "price":"Varies",
       "skill":"Simple melee",
       "book":"Zweihänder"
    },
    {
       "name":"Knuckleduster",
       "load":0,
       "handling":[
          1
       ],
       "distance":[
          "Engaged"
       ],
       "qualities":[
          "Fast",
          "Pummeling"
       ],
       "type":[
          "Brawling"
       ],
       "alternative_damage":"BB",
       "encumbrance":1,
       "price":"7ss",
       "skill":"Simple melee",
       "book":"Zweihänder"
    },
    {
       "name":"Rapier",
       "load":0,
       "handling":[
          1
       ],
       "distance":[
          "Engaged"
       ],
       "qualities":[
          "Fast",
          "Finesse",
          "Weak"
       ],
       "type":[
          "Bladed"
       ],
       "alternative_damage":"AB+1",
       "encumbrance":1,
       "price":"5gc",
       "skill":"Simple melee",
       "book":"Zweihänder"
    },
    {
       "name":"Shiv",
       "load":0,
       "handling":[
          1
       ],
       "distance":[
          "Engaged"
       ],
       "qualities":[
          "Fast",
          "Weak"
       ],
       "type":[
          "Bladed"
       ],
       "alternative_damage":"CB",
       "encumbrance":1,
       "price":"2ss",
       "skill":"Simple melee",
       "book":"Zweihänder"
    },
    {
       "name":"Splitting Maul",
       "load":0,
       "handling":[
          2
       ],
       "distance":[
          "Engaged"
       ],
       "qualities":[
          "Slow",
          "Weak"
       ],
       "type":[
          "Bladed"
       ],
       "alternative_damage":"CB+1",
       "encumbrance":3,
       "price":"4ss",
       "skill":"Simple melee",
       "book":"Zweihänder"
    },
    {
       "name":"Staff",
       "load":0,
       "handling":[
          1,
          2
       ],
       "distance":[
          "Engaged"
       ],
       "qualities":[
          "Adaptable",
          "Defensive",
          "Pummeling"
       ],
       "type":[
          "Crushing"
       ],
       "alternative_damage":"BB",
       "encumbrance":2,
       "price":"1ss",
       "skill":"Simple melee",
       "book":"Zweihänder"
    },
    {
       "name":"Stiletto",
       "load":0,
       "handling":[
          1
       ],
       "distance":[
          "Engaged"
       ],
       "qualities":[
          "Fast",
          "Vicious",
          "Weak"
       ],
       "type":[
          "Bladed"
       ],
       "alternative_damage":"CB",
       "encumbrance":1,
       "price":"1gc",
       "skill":"Simple melee",
       "book":"Zweihänder"
    },
    {
       "name":"Threshing Flail",
       "load":0,
       "handling":[
          1,
          2
       ],
       "distance":[
          "Engaged"
       ],
       "qualities":[
          "Adaptable",
          "Weak"
       ],
       "type":[
          "Crushing"
       ],
       "alternative_damage":"CB",
       "encumbrance":2,
       "price":"1ss",
       "skill":"Simple melee",
       "book":"Zweihänder"
    },
    {
       "name":"Torch",
       "load":0,
       "handling":[
          1
       ],
       "distance":[
          "Engaged"
       ],
       "qualities":[
          "Immolate",
          "Ineffective",
          "Slow"
       ],
       "type":[
          "NONE"
       ],
       "alternative_damage":"NONE",
       "encumbrance":1,
       "price":"3bp",
       "skill":"Simple melee",
       "book":"Zweihänder"
    },
    {
       "name":"Woodsman’s Axe",
       "load":0,
       "handling":[
          1,
          2
       ],
       "distance":[
          "Engaged"
       ],
       "qualities":[
          "Adaptable",
          "Slow",
          "Weak"
       ],
       "type":[
          "Bladed"
       ],
       "alternative_damage":"CB",
       "encumbrance":2,
       "price":"4ss",
       "skill":"Simple melee",
       "book":"Zweihänder"
    },
    {
       "name":"Court Sword",
       "load":0,
       "handling":[
          1
       ],
       "distance":[
          "Engaged"
       ],
       "qualities":[
          "Fast",
          "Finesse"
       ],
       "type":[
          "Bladed"
       ],
       "alternative_damage":"AB+2",
       "encumbrance":1,
       "price":"7gc",
       "skill":"Martial melee",
       "book":"Zweihänder"
    },
    {
       "name":"Estoc",
       "load":0,
       "handling":[
          1,
          2
       ],
       "distance":[
          "Engaged"
       ],
       "qualities":[
          "Adaptable",
          "Finesse"
       ],
       "type":[
          "Bladed"
       ],
       "alternative_damage":"AB+2",
       "encumbrance":2,
       "price":"7gc",
       "skill":"Martial melee",
       "book":"Zweihänder"
    },
    {
       "name":"Flanged Mace",
       "load":0,
       "handling":[
          1
       ],
       "distance":[
          "Engaged"
       ],
       "qualities":[
          "Powerful"
       ],
       "type":[
          "Crushing"
       ],
       "alternative_damage":"CB+1",
       "encumbrance":1,
       "price":"5gc",
       "skill":"Martial melee",
       "book":"Zweihänder"
    },
    {
       "name":"Main Gauche",
       "load":0,
       "handling":[
          1
       ],
       "distance":[
          "Engaged"
       ],
       "qualities":[
          "Defensive",
          "Finesse",
          "Weak"
       ],
       "type":[
          "Bladed"
       ],
       "alternative_damage":"AB",
       "encumbrance":1,
       "price":"1gc",
       "skill":"Martial melee",
       "book":"Zweihänder"
    },
    {
       "name":"Military Lance",
       "load":0,
       "handling":[
          1,
          2
       ],
       "distance":[
          "Engaged",
          "1 yard"
       ],
       "qualities":[
          "Powerful",
          "Reach",
          "Vicious"
       ],
       "type":[
          "Bladed"
       ],
       "alternative_damage":"CB+3",
       "encumbrance":3,
       "price":"1gc",
       "skill":"Martial melee",
       "book":"Zweihänder"
    },
    {
       "name":"Misericorde",
       "load":0,
       "handling":[
          1
       ],
       "distance":[
          "Engaged"
       ],
       "qualities":[
          "Fast",
          "Finesse"
       ],
       "type":[
          "Bladed"
       ],
       "alternative_damage":"AB",
       "encumbrance":1,
       "price":"2gc",
       "skill":"Martial melee",
       "book":"Zweihänder"
    },
    {
       "name":"Morgenstern",
       "load":0,
       "handling":[
          1,
          2
       ],
       "distance":[
          "Engaged"
       ],
       "qualities":[
          "Adaptable",
          "Powerful",
          "Vicious"
       ],
       "type":[
          "Crushing"
       ],
       "alternative_damage":"CB+2",
       "encumbrance":2,
       "price":"5gc",
       "skill":"Martial melee",
       "book":"Zweihänder"
    },
    {
       "name":"Mortuary Sword",
       "load":0,
       "handling":[
          1
       ],
       "distance":[
          "Engaged"
       ],
       "qualities":[
          "Vicious"
       ],
       "type":[
          "Bladed"
       ],
       "alternative_damage":"CB+1",
       "encumbrance":1,
       "price":"10gc",
       "skill":"Martial melee",
       "book":"Zweihänder"
    },
    {
       "name":"Pike",
       "load":0,
       "handling":[
          2
       ],
       "distance":[
          "Engaged",
          "1 yard"
       ],
       "qualities":[
          "Finesse",
          "Reach"
       ],
       "type":[
          "Bladed"
       ],
       "alternative_damage":"AB+3",
       "encumbrance":3,
       "price":"1gc",
       "skill":"Martial melee",
       "book":"Zweihänder"
    },
    {
       "name":"Pole Cleaver",
       "load":0,
       "handling":[
          2
       ],
       "distance":[
          "Engaged",
          "1 yard"
       ],
       "qualities":[
          "Reach"
       ],
       "type":[
          "Bladed"
       ],
       "alternative_damage":"CB+3",
       "encumbrance":3,
       "price":"4gc",
       "skill":"Martial melee",
       "book":"Zweihänder"
    },
    {
       "name":"Sabre",
       "load":0,
       "handling":[
          1
       ],
       "distance":[
          "Engaged"
       ],
       "qualities":[
          "Defensive"
       ],
       "type":[
          "Bladed"
       ],
       "alternative_damage":"CB+1",
       "encumbrance":1,
       "price":"6gc",
       "skill":"Martial melee",
       "book":"Zweihänder"
    },
    {
       "name":"War Hammer",
       "load":0,
       "handling":[
          2
       ],
       "distance":[
          "Engaged"
       ],
       "qualities":[
          "Powerful",
          "Slow"
       ],
       "type":[
          "Crushing"
       ],
       "alternative_damage":"CB+3",
       "encumbrance":3,
       "price":"5gc",
       "skill":"Martial melee",
       "book":"Zweihänder"
    },
    {
       "name":"Zweihänder",
       "load":0,
       "handling":[
          2
       ],
       "distance":[
          "Engaged",
          "1 yard"
       ],
       "qualities":[
          "Punishing",
          "Reach",
          "Slow"
       ],
       "type":[
          "Bladed"
       ],
       "alternative_damage":"CB+3",
       "encumbrance":3,
       "price":"12gc",
       "skill":"Martial melee",
       "book":"Zweihänder"
    },
    {
       "name":"Bolas",
       "load":1,
       "handling":[
          1
       ],
       "distance":[
          "1+[PB] yards"
       ],
       "qualities":[
          "Entangling",
          "Ineffective",
          "Throwing"
       ],
       "type":[
          "Missile"
       ],
       "alternative_damage":"NONE",
       "encumbrance":1,
       "price":"2ss",
       "skill":"Simple ranged",
       "book":"Zweihänder"
    },
    {
       "name":"Bottle Bomb",
       "load":1,
       "handling":[
          1
       ],
       "distance":[
          "1+[PB] yards"
       ],
       "qualities":[
          "Fiery",
          "Ineffective",
          "Throwing",
          "Volatile"
       ],
       "type":[
          "NONE"
       ],
       "alternative_damage":"CB",
       "encumbrance":1,
       "price":"12ss",
       "skill":"Simple ranged",
       "book":"Zweihänder"
    },
    {
       "name":"Francisca",
       "load":1,
       "handling":[
          1
       ],
       "distance":[
          "1+[PB] yards"
       ],
       "qualities":[
          "Throwing",
          "Weak"
       ],
       "type":[
          "Missile"
       ],
       "alternative_damage":"CB+1",
       "encumbrance":1,
       "price":"2gc",
       "skill":"Simple ranged",
       "book":"Zweihänder"
    },
    {
       "name":"Hunting Bow",
       "load":1,
       "handling":[
          2
       ],
       "distance":[
          "9+[PB] yards"
       ],
       "qualities":[
          "Finesse",
          "Weak"
       ],
       "type":[
          "Missile"
       ],
       "alternative_damage":"AB+1",
       "encumbrance":3,
       "price":"4gc",
       "skill":"Simple ranged",
       "book":"Zweihänder"
    },
    {
       "name":"Improvised Throwing Weapon",
       "load":1,
       "handling":[
          1
       ],
       "distance":[
          "1+[PB] yards"
       ],
       "qualities":[
          "Pummeling",
          "Slow",
          "Throwing"
       ],
       "type":[
          "Missile"
       ],
       "alternative_damage":"BB",
       "encumbrance":1,
       "price":"Varies",
       "skill":"Simple ranged",
       "book":"Zweihänder"
    },
    {
       "name":"Javelin",
       "load":1,
       "handling":[
          1
       ],
       "distance":[
          "3+[PB] yards"
       ],
       "qualities":[
          "Throwing",
          "Weak"
       ],
       "type":[
          "Missile"
       ],
       "alternative_damage":"CB",
       "encumbrance":1,
       "price":"6ss",
       "skill":"Simple ranged",
       "book":"Zweihänder"
    },
    {
       "name":"Light Crossbow",
       "load":2,
       "handling":[
          2
       ],
       "distance":[
          "6+[PB] yards"
       ],
       "qualities":[
          "Fast",
          "Punishing",
          "Weak"
       ],
       "type":[
          "Missile"
       ],
       "alternative_damage":"CB+1",
       "encumbrance":3,
       "price":"3gc",
       "skill":"Simple ranged",
       "book":"Zweihänder"
    },
    {
       "name":"Shepherd’s Sling",
       "load":1,
       "handling":[
          1
       ],
       "distance":[
          "3+[PB] yards"
       ],
       "qualities":[
          "Fast",
          "Throwing",
          "Weak"
       ],
       "type":[
          "Missile"
       ],
       "alternative_damage":"CB",
       "encumbrance":1,
       "price":"2ss",
       "skill":"Simple ranged",
       "book":"Zweihänder"
    },
    {
       "name":"Throwing Knife",
       "load":1,
       "handling":[
          1
       ],
       "distance":[
          "1+[PB] yards"
       ],
       "qualities":[
          "Fast",
          "Finesse",
          "Throwing",
          "Weak"
       ],
       "type":[
          "Missile"
       ],
       "alternative_damage":"AB",
       "encumbrance":1,
       "price":"1gc",
       "skill":"Simple ranged",
       "book":"Zweihänder"
    },
    {
       "name":"Arquebus",
       "load":4,
       "handling":[
          2
       ],
       "distance":[
          "6+[PB] yards"
       ],
       "qualities":[
          "Gunpowder",
          "Volatile"
       ],
       "type":[
          "Gunpowder"
       ],
       "alternative_damage":"CB+2",
       "encumbrance":3,
       "price":"33gc",
       "skill":"Martial ranged",
       "book":"Zweihänder"
    },
    {
       "name":"Composite Bow",
       "load":2,
       "handling":[
          2
       ],
       "distance":[
          "12+[PB] yards"
       ],
       "qualities":[
          "Fast",
          "Finesse"
       ],
       "type":[
          "Missile"
       ],
       "alternative_damage":"AB+2",
       "encumbrance":3,
       "price":"7gc",
       "skill":"Martial ranged",
       "book":"Zweihänder"
    },
    {
       "name":"Dragon Pistol",
       "load":4,
       "handling":[
          1
       ],
       "distance":[
          "1+[PB] yards"
       ],
       "qualities":[
          "Gunpowder",
          "Shrapnel,Volatile",
          "Weak"
       ],
       "type":[
          "Gunpowder"
       ],
       "alternative_damage":"CB",
       "encumbrance":2,
       "price":"40gc",
       "skill":"Martial ranged",
       "book":"Zweihänder"
    },
    {
       "name":"Dueling Pistol",
       "load":3,
       "handling":[
          1
       ],
       "distance":[
          "3+[PB] yards"
       ],
       "qualities":[
          "Gunpowder"
       ],
       "type":[
          "Gunpowder"
       ],
       "alternative_damage":"CB+2",
       "encumbrance":2,
       "price":"50gc",
       "skill":"Martial ranged",
       "book":"Zweihänder"
    },
    {
       "name":"Flintlock Pistol",
       "load":3,
       "handling":[
          1
       ],
       "distance":[
          "3+[PB] yards"
       ],
       "qualities":[
          "Gunpowder",
          "Volatile"
       ],
       "type":[
          "Gunpowder"
       ],
       "alternative_damage":"CB+1",
       "encumbrance":2,
       "price":"20gc",
       "skill":"Martial ranged",
       "book":"Zweihänder"
    },
    {
       "name":"Longbow",
       "load":1,
       "handling":[
          2
       ],
       "distance":[
          "12+[PB] yards"
       ],
       "qualities":[
          "Finesse"
       ],
       "type":[
          "Missile"
       ],
       "alternative_damage":"AB+2",
       "encumbrance":3,
       "price":"5gc",
       "skill":"Martial ranged",
       "book":"Zweihänder"
    },
    {
       "name":"Musket",
       "load":4,
       "handling":[
          2
       ],
       "distance":[
          "9+[PB] yards"
       ],
       "qualities":[
          "Gunpowder"
       ],
       "type":[
          "Gunpowder"
       ],
       "alternative_damage":"CB+3",
       "encumbrance":3,
       "price":"67gc",
       "skill":"Martial ranged",
       "book":"Zweihänder"
    },
    {
       "name":"Three-Barrel Pistol",
       "load":4,
       "handling":[
          1
       ],
       "distance":[
          "3+[PB] yards"
       ],
       "qualities":[
          "Gunpowder",
          "Repeating",
          "Volatile"
       ],
       "type":[
          "Gunpowder"
       ],
       "alternative_damage":"CB",
       "encumbrance":2,
       "price":"83gc",
       "skill":"Martial ranged",
       "book":"Zweihänder"
    },
    {
       "name":"Barbed Spear",
       "load":0,
       "handling":[
          1,
          2
       ],
       "distance":[
          "Engaged"
       ],
       "qualities":[
          "Adaptable",
          "Fast",
          "Vicious"
       ],
       "type":[
          "Bladed"
       ],
       "alternative_damage":"CB+1",
       "encumbrance":2,
       "price":"1gc",
       "skill":"Martial melee",
       "book":"Main Gauche"
    },
    {
       "name":"Bec De Corbin",
       "load":0,
       "handling":[
          2
       ],
       "distance":[
          "Engaged"
       ],
       "qualities":[
          "Fast",
          "Powerful"
       ],
       "type":[
          "Bladed",
          "Crushing"
       ],
       "alternative_damage":"CB+2",
       "encumbrance":3,
       "price":"4gc",
       "skill":"Martial melee",
       "book":"Main Gauche"
    },
    {
       "name":"Bohemian Earspoon",
       "load":0,
       "handling":[
          2
       ],
       "distance":[
          "Engaged"
       ],
       "qualities":[
          "Defensive",
          "Vicious"
       ],
       "type":[
          "Bladed"
       ],
       "alternative_damage":"CB+2",
       "encumbrance":3,
       "price":"4gc",
       "skill":"Martial melee",
       "book":"Main Gauche"
    },
    {
       "name":"Claymore",
       "load":0,
       "handling":[
          1,
          2
       ],
       "distance":[
          "Engaged"
       ],
       "qualities":[
          "Adaptable",
          "Punishing",
          "Slow"
       ],
       "type":[
          "Bladed"
       ],
       "alternative_damage":"CB+2",
       "encumbrance":2,
       "price":"10gc",
       "skill":"Martial melee",
       "book":"Main Gauche"
    },
    {
       "name":"Demilance",
       "load":0,
       "handling":[
          2
       ],
       "distance":[
          "Engaged",
          "1 yard"
       ],
       "qualities":[
          "Powerful",
          "Reach"
       ],
       "type":[
          "Bladed"
       ],
       "alternative_damage":"CB+2",
       "encumbrance":2,
       "price":"1gc",
       "skill":"Martial melee",
       "book":"Main Gauche"
    },
    {
       "name":"Falchion",
       "load":0,
       "handling":[
          1,
          2
       ],
       "distance":[
          "Engaged"
       ],
       "qualities":[
          "Adaptable",
          "Vicious"
       ],
       "type":[
          "Bladed"
       ],
       "alternative_damage":"CB+1",
       "encumbrance":2,
       "price":"7gc",
       "skill":"Martial melee",
       "book":"Main Gauche"
    },
    {
       "name":"Flammard Rapier",
       "load":0,
       "handling":[
          1
       ],
       "distance":[
          "Engaged"
       ],
       "qualities":[
          "Binding",
          "Defensive",
          "Finesse",
          "Weak"
       ],
       "type":[
          "Bladed"
       ],
       "alternative_damage":"AB+2",
       "encumbrance":1,
       "price":"5gc",
       "skill":"Martial melee",
       "book":"Main Gauche"
    },
    {
       "name":"Gauntlet-Sword",
       "load":0,
       "handling":[
          1
       ],
       "distance":[
          "Engaged"
       ],
       "qualities":[
          "Arming",
          "Finesse",
          "Slow"
       ],
       "type":[
          "Bladed"
       ],
       "alternative_damage":"AB",
       "encumbrance":2,
       "price":"7gc",
       "skill":"Martial melee",
       "book":"Main Gauche"
    },
    {
       "name":"Glaive",
       "load":0,
       "handling":[
          2
       ],
       "distance":[
          "Engaged",
          "1 yard"
       ],
       "qualities":[
          "Reach",
          "Vicious"
       ],
       "type":[
          "Bladed"
       ],
       "alternative_damage":"CB+3",
       "encumbrance":3,
       "price":"2gc",
       "skill":"Martial melee",
       "book":"Main Gauche"
    },
    {
       "name":"Greatsword",
       "load":0,
       "handling":[
          2
       ],
       "distance":[
          "Engaged",
          "1 yard"
       ],
       "qualities":[
          "Finesse",
          "Reach",
          "Slow"
       ],
       "type":[
          "Bladed"
       ],
       "alternative_damage":"AB+3",
       "encumbrance":3,
       "price":"12gc",
       "skill":"Martial melee",
       "book":"Main Gauche"
    },
    {
       "name":"Guisarme",
       "load":0,
       "handling":[
          2
       ],
       "distance":[
          "Engaged",
          "1 yard"
       ],
       "qualities":[
          "Entangling",
          "Finesse",
          "Reach"
       ],
       "type":[
          "Bladed"
       ],
       "alternative_damage":"AB+2",
       "encumbrance":3,
       "price":"4gc",
       "skill":"Martial melee",
       "book":"Main Gauche"
    },
    {
       "name":"Halberd",
       "load":0,
       "handling":[
          2
       ],
       "distance":[
          "Engaged",
          "1 yard"
       ],
       "qualities":[
          "Powerful",
          "Reach",
          "Slow"
       ],
       "type":[
          "Bladed"
       ],
       "alternative_damage":"CB+2",
       "encumbrance":3,
       "price":"5gc",
       "skill":"Martial melee",
       "book":"Main Gauche"
    },
    {
       "name":"Katzbalger",
       "load":0,
       "handling":[
          1
       ],
       "distance":[
          "Engaged"
       ],
       "qualities":[
          "Defensive",
          "Weak"
       ],
       "type":[
          "Bladed"
       ],
       "alternative_damage":"CB",
       "encumbrance":1,
       "price":"2gc",
       "skill":"Martial melee",
       "book":"Main Gauche"
    },
    {
       "name":"Lochaber Axe",
       "load":0,
       "handling":[
          1,
          2
       ],
       "distance":[
          "Engaged"
       ],
       "qualities":[
          "Adaptable",
          "Powerful"
       ],
       "type":[
          "Bladed"
       ],
       "alternative_damage":"CB+2",
       "encumbrance":2,
       "price":"2gc",
       "skill":"Martial melee",
       "book":"Main Gauche"
    },
    {
       "name":"Man-Catcher",
       "load":0,
       "handling":[
          2
       ],
       "distance":[
          "Engaged",
          "1 yard"
       ],
       "qualities":[
          "Arming",
          "Entangling",
          "Reach",
          "Weak"
       ],
       "type":[
          "Crushing"
       ],
       "alternative_damage":"CB+1",
       "encumbrance":3,
       "price":"7gc",
       "skill":"Martial melee",
       "book":"Main Gauche"
    },
    {
       "name":"Military Fork",
       "load":0,
       "handling":[
          1,
          2
       ],
       "distance":[
          "Engaged"
       ],
       "qualities":[
          "Adaptable",
          "Finesse"
       ],
       "type":[
          "Bladed"
       ],
       "alternative_damage":"AB+2",
       "encumbrance":2,
       "price":"7gc",
       "skill":"Martial melee",
       "book":"Main Gauche"
    },
    {
       "name":"Military Pike",
       "load":0,
       "handling":[
          2
       ],
       "distance":[
          "Engaged"
       ],
       "qualities":[
          "Slow",
          "Powerful",
          "Punishing"
       ],
       "type":[
          "Bladed"
       ],
       "alternative_damage":"CB+2",
       "encumbrance":3,
       "price":"5gc",
       "skill":"Martial melee",
       "book":"Main Gauche"
    },
    {
       "name":"Rondel Dagger",
       "load":0,
       "handling":[
          1,
          2
       ],
       "distance":[
          "Engaged"
       ],
       "qualities":[
          "Adaptable",
          "Vicious",
          "Weak"
       ],
       "type":[
          "Bladed"
       ],
       "alternative_damage":"CB",
       "encumbrance":1,
       "price":"1gc",
       "skill":"Martial melee",
       "book":"Main Gauche"
    },
    {
       "name":"Sparth Axe",
       "load":0,
       "handling":[
          2
       ],
       "distance":[
          "Engaged"
       ],
       "qualities":[
          "Punishing",
          "Slow",
          "Vicious"
       ],
       "type":[
          "Bladed"
       ],
       "alternative_damage":"CB+3",
       "encumbrance":3,
       "price":"2gc",
       "skill":"Martial melee",
       "book":"Main Gauche"
    },
    {
       "name":"Swagger Stick",
       "load":0,
       "handling":[
          1
       ],
       "distance":[
          "Engaged"
       ],
       "qualities":[
          "Powerful",
          "Pummeling",
          "Slow"
       ],
       "type":[
          "Crushing"
       ],
       "alternative_damage":"BB",
       "encumbrance":1,
       "price":"1gc",
       "skill":"Martial melee",
       "book":"Main Gauche"
    },
    {
       "name":"Swordbreaker",
       "load":0,
       "handling":[
          1
       ],
       "distance":[
          "Engaged"
       ],
       "qualities":[
          "Breaker",
          "Finesse",
          "Weak"
       ],
       "type":[
          "Bladed"
       ],
       "alternative_damage":"AB",
       "encumbrance":1,
       "price":"8ss",
       "skill":"Martial melee",
       "book":"Main Gauche"
    },
    {
       "name":"Tulwar",
       "load":0,
       "handling":[
          1
       ],
       "distance":[
          "Engaged"
       ],
       "qualities":[
          "Fast",
          "Finesse"
       ],
       "type":[
          "Bladed"
       ],
       "alternative_damage":"AB",
       "encumbrance":1,
       "price":"7gc",
       "skill":"Martial melee",
       "book":"Main Gauche"
    },
    {
       "name":"Urumi",
       "load":0,
       "handling":[
          1
       ],
       "distance":[
          "Engaged"
       ],
       "qualities":[
          "Distraction",
          "Fast",
          "Weak"
       ],
       "type":[
          "Bladed"
       ],
       "alternative_damage":"CB",
       "encumbrance":2,
       "price":"2gc",
       "skill":"Martial melee",
       "book":"Main Gauche"
    },
    {
       "name":"Voulge",
       "load":0,
       "handling":[
          2
       ],
       "distance":[
          "Engaged",
          "1 yard"
       ],
       "qualities":[
          "Reach",
          "Vicious"
       ],
       "type":[
          "Bladed"
       ],
       "alternative_damage":"CB+2",
       "encumbrance":3,
       "price":"4gc",
       "skill":"Martial melee",
       "book":"Main Gauche"
    },
    {
       "name":"War Chopper",
       "load":0,
       "handling":[
          1,
          2
       ],
       "distance":[
          "Engaged"
       ],
       "qualities":[
          "Adaptable",
          "Slow",
          "Vicious"
       ],
       "type":[
          "Bladed"
       ],
       "alternative_damage":"CB+1",
       "encumbrance":1,
       "price":"7gc",
       "skill":"Martial melee",
       "book":"Main Gauche"
    },
    {
       "name":"Bollock Dagger",
       "load":0,
       "handling":[
          1
       ],
       "distance":[
          "Engaged"
       ],
       "qualities":[
          "Slow",
          "Vicious",
          "Weak"
       ],
       "type":[
          "Bladed"
       ],
       "alternative_damage":"CB",
       "encumbrance":1,
       "price":"10ss",
       "skill":"Simple melee",
       "book":"Main Gauche"
    },
    {
       "name":"Cat O’ Nine Tails",
       "load":0,
       "handling":[
          1
       ],
       "distance":[
          "Engaged"
       ],
       "qualities":[
          "Fast",
          "Pummeling"
       ],
       "type":[
          "Brawling"
       ],
       "alternative_damage":"BB-2",
       "encumbrance":1,
       "price":"7ss",
       "skill":"Simple melee",
       "book":"Main Gauche"
    },
    {
       "name":"Cestus",
       "load":0,
       "handling":[
          1
       ],
       "distance":[
          "Engaged"
       ],
       "qualities":[
          "Light",
          "Pummeling"
       ],
       "type":[
          "Brawling"
       ],
       "alternative_damage":"BB",
       "encumbrance":1,
       "price":"8bp",
       "skill":"Simple melee",
       "book":"Main Gauche"
    },
    {
       "name":"Cleaver",
       "load":0,
       "handling":[
          1
       ],
       "distance":[
          "Engaged"
       ],
       "qualities":[
          "Slow",
          "Punishing",
          "Weak"
       ],
       "type":[
          "Bladed"
       ],
       "alternative_damage":"CB",
       "encumbrance":1,
       "price":"2ss",
       "skill":"Simple melee",
       "book":"Main Gauche"
    },
    {
       "name":"Fauchard",
       "load":0,
       "handling":[
          2
       ],
       "distance":[
          "Engaged",
          "1 yard"
       ],
       "qualities":[
          "Entangling",
          "Reach",
          "Weak"
       ],
       "type":[
          "Bladed"
       ],
       "alternative_damage":"CB+1",
       "encumbrance":3,
       "price":"7ss",
       "skill":"Simple melee",
       "book":"Main Gauche"
    },
    {
       "name":"Foil",
       "load":0,
       "handling":[
          1
       ],
       "distance":[
          "Engaged"
       ],
       "qualities":[
          "Binding",
          "Finesse",
          "Slow",
          "Weak"
       ],
       "type":[
          "Bladed"
       ],
       "alternative_damage":"AB",
       "encumbrance":1,
       "price":"3gc",
       "skill":"Simple melee",
       "book":"Main Gauche"
    },
    {
       "name":"Hunting Sword",
       "load":0,
       "handling":[
          1
       ],
       "distance":[
          "Engaged"
       ],
       "qualities":[
          "Finesse",
          "Light",
          "Vicious",
          "Weak"
       ],
       "type":[
          "Bladed"
       ],
       "alternative_damage":"AB",
       "encumbrance":2,
       "price":"2gc",
       "skill":"Simple melee",
       "book":"Main Gauche"
    },
    {
       "name":"Khopesh",
       "load":0,
       "handling":[
          1
       ],
       "distance":[
          "Engaged"
       ],
       "qualities":[
          "Slow",
          "Vicious",
          "Weak"
       ],
       "type":[
          "Bladed"
       ],
       "alternative_damage":"CB+1",
       "encumbrance":1,
       "price":"1gc",
       "skill":"Simple melee",
       "book":"Main Gauche"
    },
    {
       "name":"Pick Axe",
       "load":0,
       "handling":[
          2
       ],
       "distance":[
          "Engaged"
       ],
       "qualities":[
          "Slow",
          "Punishing",
          "Weak"
       ],
       "type":[
          "Bladed"
       ],
       "alternative_damage":"CB+1",
       "encumbrance":2,
       "price":"2ss",
       "skill":"Simple melee",
       "book":"Main Gauche"
    },
    {
       "name":"Pilgrim’s Staff",
       "load":0,
       "handling":[
          2
       ],
       "distance":[
          "Engaged"
       ],
       "qualities":[
          "Defensive",
          "Powerful",
          "Pummeling"
       ],
       "type":[
          "Crushing"
       ],
       "alternative_damage":"BB+1",
       "encumbrance":2,
       "price":"2ss",
       "skill":"Simple melee",
       "book":"Main Gauche"
    },
    {
       "name":"Pitchfork",
       "load":0,
       "handling":[
          2
       ],
       "distance":[
          "Engaged",
          "1 yard"
       ],
       "qualities":[
          "Reach",
          "Slow",
          "Weak"
       ],
       "type":[
          "Bladed"
       ],
       "alternative_damage":"CB+1",
       "encumbrance":2,
       "price":"2ss",
       "skill":"Simple melee",
       "book":"Main Gauche"
    },
    {
       "name":"Scourge",
       "load":0,
       "handling":[
          1
       ],
       "distance":[
          "Engaged",
          "1 yard"
       ],
       "qualities":[
          "Pummeling",
          "Reach"
       ],
       "type":[
          "Brawling"
       ],
       "alternative_damage":"BB-1",
       "encumbrance":2,
       "price":"12ss",
       "skill":"Simple melee",
       "book":"Main Gauche"
    },
    {
       "name":"Scythe",
       "load":0,
       "handling":[
          2
       ],
       "distance":[
          "Engaged"
       ],
       "qualities":[
          "Powerful",
          "Slow",
          "Vicious",
          "Weak"
       ],
       "type":[
          "Bladed"
       ],
       "alternative_damage":"CB+1",
       "encumbrance":3,
       "price":"4ss",
       "skill":"Simple melee",
       "book":"Main Gauche"
    },
    {
       "name":"Sickle",
       "load":0,
       "handling":[
          1
       ],
       "distance":[
          "Engaged"
       ],
       "qualities":[
          "Finesse",
          "Slow",
          "Vicious",
          "Weak"
       ],
       "type":[
          "Bladed"
       ],
       "alternative_damage":"AB",
       "encumbrance":2,
       "price":"3ss",
       "skill":"Simple melee",
       "book":"Main Gauche"
    },
    {
       "name":"Swordstick",
       "load":0,
       "handling":[
          1
       ],
       "distance":[
          "Engaged"
       ],
       "qualities":[
          "Finesse",
          "Weak"
       ],
       "type":[
          "Bladed",
          "Crushing"
       ],
       "alternative_damage":"AB",
       "encumbrance":1,
       "price":"3gc",
       "skill":"Simple melee",
       "book":"Main Gauche"
    },
    {
       "name":"Trident",
       "load":0,
       "handling":[
          1,
          2
       ],
       "distance":[
          "Engaged"
       ],
       "qualities":[
          "Adaptable",
          "Finesse",
          "Weak"
       ],
       "type":[
          "Bladed"
       ],
       "alternative_damage":"AB",
       "encumbrance":2,
       "price":"4ss",
       "skill":"Simple melee",
       "book":"Main Gauche"
    },
    {
       "name":"Trident Dagger",
       "load":0,
       "handling":[
          1
       ],
       "distance":[
          "Engaged"
       ],
       "qualities":[
          "Binding",
          "Light",
          "Weak"
       ],
       "type":[
          "Bladed"
       ],
       "alternative_damage":"CB",
       "encumbrance":1,
       "price":"1gc",
       "skill":"Simple melee",
       "book":"Main Gauche"
    },
    {
       "name":"Hand Bombard",
       "load":4,
       "handling":[
          2
       ],
       "distance":[
          "3+[PB] yards"
       ],
       "qualities":[
          "Detonate",
          "Gunpowder",
          "Volatile"
       ],
       "type":[
          "Gunpowder"
       ],
       "alternative_damage":"CB+2",
       "encumbrance":3,
       "price":"68gc",
       "skill":"Martial ranged",
       "book":"Main Gauche"
    },
    {
       "name":"Handcannon",
       "load":2,
       "handling":[
          1
       ],
       "distance":[
          "3+[PB] yards"
       ],
       "qualities":[
          "Gunpowder",
          "Punishing",
          "Recoil",
          "Volatile"
       ],
       "type":[
          "Gunpowder"
       ],
       "alternative_damage":"CB+1",
       "encumbrance":2,
       "price":"34gc",
       "skill":"Martial ranged",
       "book":"Main Gauche"
    },
    {
       "name":"Rampart Gun",
       "load":6,
       "handling":[
          2
       ],
       "distance":[
          "18+[PB] yards"
       ],
       "qualities":[
          "Brace",
          "Gunpowder",
          "Punishing",
          "Vicious"
       ],
       "type":[
          "Gunpowder"
       ],
       "alternative_damage":"CB+3",
       "encumbrance":6,
       "price":"154gc",
       "skill":"Martial ranged",
       "book":"Main Gauche"
    },
    {
       "name":"Repeating Crossbow",
       "load":4,
       "handling":[
          2
       ],
       "distance":[
          "6+[PB] yards"
       ],
       "qualities":[
          "Fast",
          "Punishing",
          "Repeating"
       ],
       "type":[
          "Missile"
       ],
       "alternative_damage":"CB+2",
       "encumbrance":3,
       "price":"10gc",
       "skill":"Martial ranged",
       "book":"Main Gauche"
    },
    {
       "name":"Wytchfyre Jezzail",
       "load":4,
       "handling":[
          2
       ],
       "distance":[
          "12+[PB] yards"
       ],
       "qualities":[
          "Finesse",
          "Gunpowder",
          "Volatile",
          "Wytchfyre"
       ],
       "type":[
          "Wytch-Science"
       ],
       "alternative_damage":"AB+2",
       "encumbrance":4,
       "price":"UNIQUE",
       "skill":"Martial ranged",
       "book":"Main Gauche"
    },
    {
       "name":"Wytchfyre Pistol",
       "load":3,
       "handling":[
          1
       ],
       "distance":[
          "9+[PB] yards"
       ],
       "qualities":[
          "Finesse",
          "Gunpowder",
          "Vicious",
          "Volatile",
          "Wytchfyre"
       ],
       "type":[
          "Wytch-Science"
       ],
       "alternative_damage":"AB+1",
       "encumbrance":2,
       "price":"UNIQUE",
       "skill":"Martial ranged",
       "book":"Main Gauche"
    },
    {
       "name":"Wytchfyre Thrower",
       "load":4,
       "handling":[
          2
       ],
       "distance":[
          "3+[PB] yards"
       ],
       "qualities":[
          "Brace",
          "Finesse",
          "Gunpowder",
          "Repeating",
          "Shrapnel",
          "Volatile",
          "Wytchfyre"
       ],
       "type":[
          "Wytch-Science"
       ],
       "alternative_damage":"CB+2",
       "encumbrance":6,
       "price":"UNIQUE",
       "skill":"Martial ranged",
       "book":"Main Gauche"
    },
    {
       "name":"Glass Grenade",
       "load":1,
       "handling":[
          1
       ],
       "distance":[
          "1+[PB] yards"
       ],
       "qualities":[
          "Gas",
          "Ineffective",
          "Throwing"
       ],
       "type":[
          "Wytch-Science"
       ],
       "alternative_damage":"NONE",
       "encumbrance":2,
       "price":"UNIQUE",
       "skill":"Simple ranged",
       "book":"Main Gauche"
    },
    {
       "name":"Lasso",
       "load":2,
       "handling":[
          2
       ],
       "distance":[
          "1+[PB] yards"
       ],
       "qualities":[
          "Arming",
          "Entangling",
          "Ineffective",
          "Throwing"
       ],
       "type":[
          "Missile"
       ],
       "alternative_damage":"NONE",
       "encumbrance":2,
       "price":"5ss",
       "skill":"Simple ranged",
       "book":"Main Gauche"
    },
    {
       "name":"Net",
       "load":2,
       "handling":[
          1
       ],
       "distance":[
          "1+[PB] yards"
       ],
       "qualities":[
          "Entangling",
          "Ineffective",
          "Throwing"
       ],
       "type":[
          "Missile"
       ],
       "alternative_damage":"NONE",
       "encumbrance":2,
       "price":"5ss",
       "skill":"Simple ranged",
       "book":"Main Gauche"
    },
    {
       "name":"Pigskin",
       "load":1,
       "handling":[
          1
       ],
       "distance":[
          "18+[PB] yards"
       ],
       "qualities":[
          "Fast",
          "Ineffective",
          "Throwing"
       ],
       "type":[
          "Missile"
       ],
       "alternative_damage":"NONE",
       "encumbrance":1,
       "price":"1ss",
       "skill":"Simple ranged",
       "book":"Main Gauche"
    },
    {
       "name":"Smoke Bomb",
       "load":1,
       "handling":[
          1
       ],
       "distance":[
          "1+[PB] yards"
       ],
       "qualities":[
          "Ineffective",
          "Smoke",
          "Throwing"
       ],
       "type":[
          "Missile"
       ],
       "alternative_damage":"NONE",
       "encumbrance":1,
       "price":"10s",
       "skill":"Simple ranged",
       "book":"Main Gauche"
    },
    {
       "name":"Staff Sling",
       "load":2,
       "handling":[
          2
       ],
       "distance":[
          "3+[PB] yards"
       ],
       "qualities":[
          "Fast",
          "Pummeling",
          "Throwing"
       ],
       "type":[
          "Missile"
       ],
       "alternative_damage":"BB",
       "encumbrance":1,
       "price":"6ss",
       "skill":"Simple ranged",
       "book":"Main Gauche"
    },
    {
       "name":"Throwing Star",
       "load":1,
       "handling":[
          1
       ],
       "distance":[
          "1+[PB] yards"
       ],
       "qualities":[
          "Distraction",
          "Fast",
          "Ineffective",
          "Throwing"
       ],
       "type":[
          "Bladed"
       ],
       "alternative_damage":"NONE",
       "encumbrance":1,
       "price":"1gc",
       "skill":"Simple ranged",
       "book":"Main Gauche"
    }
 ]