import React from "react";
import styled from "styled-components";

export default function AncestryTraitCard(props: Props) {
  const trait = props.trait;
  return (
    <article aria-label={trait.name}>
      <div>
        {/*<span>{`${trait.from}-${trait.to}`}</span>*/}
        <h3>{trait.name}</h3>
        <Description>{trait.description}</Description>
        <PropertyList>
          <Property name="Effect">{trait.effect}</Property>
        </PropertyList>
      </div>
    </article>
  );
}

type Props = {
  trait: Trait;
};

export type Trait = {
  name: string;
  description: string;
  effect: string;
};

function Property({ name, children }: PropertyProps) {
  return (
    <>
      <Term>{name}</Term>
      <Definition>{children}</Definition>
    </>
  );
}

type PropertyProps = {
  name: string;
  children: string;
};

const PropertyList = styled.dl`
  font-family: Arial, Times, serif;
  font-size: 16px;
  color: black;
`;

const Term = styled.dt`
  display: inline-block;
  cursor: text;
  font-weight: bold;
  font-style: italic;

  :after {
    content: ": ";
    white-space: pre;
  }
`;

const Definition = styled.dd`
  display: inline;
  cursor: text;

  :after {
    display: block;
    content: "";
  }
`;

const Description = styled.p`
  font-style: italic;
  color: black;
`;