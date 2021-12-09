import styled from "styled-components";
import React, { ReactNode, useState } from "react";

export const SEPARATION = "4px";
export const BORDER_RADIUS = "6px";

export type AccordionItemType = {
  name: string;
  content: ReactNode;
};

export default function Accordion({
  items,
}: {
  items: Array<AccordionItemType>;
}) {
  return (
    <AccordionContainer>
      {items.map((item) => (
        <AccordionItem item={item} key={item.name} />
      ))}
    </AccordionContainer>
  );
}

const AccordionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
  border-radius: ${BORDER_RADIUS};
  border: 1px gray solid;
  grid-area: misc;
  background-color: gray;
  overflow-y: auto;
  overflow-x: hidden;
`;

const AccordionItemName = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  height: 36px;
  min-height: 36px;
  font-size: 20px;
  font-family: Almendra, serif;
  background-color: lightgray;
  user-select: none;
  cursor: pointer;
`;

const AccordionItemContent = styled.div<{ open: boolean }>`
  background-color: whitesmoke;
  ${({ open }) => (open ? "" : "display: none")};
  padding: ${SEPARATION};
`;

function AccordionItem({ item }: { item: AccordionItemType }) {
  const [open, setOpen] = useState(false);
  return (
    <React.Fragment key={item.name}>
      <AccordionItemName onClick={() => setOpen((open) => !open)}>
        {item.name}
      </AccordionItemName>
      <AccordionItemContent open={open}>{item.content}</AccordionItemContent>
    </React.Fragment>
  );
}

//TODO style misc accordion
