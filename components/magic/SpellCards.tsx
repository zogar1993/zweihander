import React from "react";
import { Spell } from "../../src/Spell";
import Grid from "../general/Grid";
import SpellCard from "./SpellCard";

export default function SpellCards({ spells }: Props) {
  return (
    <Grid columns={3} mobile-columns={1}>
      {spells.map((spell) => (
        <SpellCard spell={spell} key={spell.code} />
      ))}
    </Grid>
  );
}

type Props = {
  spells: Array<Spell>;
};
