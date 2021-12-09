import React from "react";
import styled from "styled-components";
import { Spell } from "../../src/Spell";
import theme, { BORDER_RADIUS } from "../theme";

const SEPARATION = "4px";

export default function SpellCard({ spell }: Props) {
  return (
    <Section>
      <Title>{spell.name}</Title>
      <TagContainer>
        <Tag>{spell.school}</Tag>
        <Tag>{spell.principle}</Tag>
        <Tag>{spell.distance_tag}</Tag>
      </TagContainer>
      <Paragraph>{spell.description}</Paragraph>
    </Section>
  );
}

type Props = {
  spell: Spell;
};

//TODO move constants to theme

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${SEPARATION};

  border: 1px solid lightgray;
  border-radius: ${BORDER_RADIUS};
  padding: ${SEPARATION} calc(3 * ${SEPARATION});
  min-width: 200px;

  user-select: none;
  cursor: pointer;
`;

const TagContainer = styled.div`
  display: flex;
  gap: ${SEPARATION};
`;

const Tag = styled.span`
  border: 1px solid lightgray;
  border-radius: 4px;
  padding: 3px 5px 3px 5px;
  margin: 2px;
`;

const Paragraph = styled.p`
  color: black;
`;

const Title = styled.h3`
  font-family: ${theme.fonts.title};
  font-size: 26px;
  text-align: center;
  color: black;
  text-transform: capitalize;
`;