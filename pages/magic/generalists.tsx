import styled from "styled-components";
import React from "react";
import SpellCards from "../../components/magic/SpellCards";
import getMagicSpells from "../../lib/GetMagicSpells";
import { Spell } from "../../src/Spell";
import { SEPARATION } from "../ancestries/[slug]";

export default function GeneralistMagic({ spells }: { spells: Array<Spell> }) {
  return (
    <SourceContainer>
      <Title>Generalist Magic</Title>
      <SpellCards spells={spells} />
    </SourceContainer>
  );
}

export async function getStaticProps() {
  const spells = await getMagicSpells();
  return {
    props: {
      spells: spells.filter((x) => x.school === "Generalist"),
    },
  };
}

const Title = styled.h3`
  font-size: 34px;
  text-align: center;
  color: black;
  text-transform: capitalize;
`;

const SourceContainer = styled.h3`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${SEPARATION};
`;
