import type { AppProps } from "next/app";
import Head from "next/head";
import { ReactNode, useEffect, useState } from "react";
import Main from "../components/Main";
import { MenuItem } from "../components/Menu";
import { Ancestry } from "../src/Ancestry";
import "../public/reset.css";
import "../public/fonts.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <CssPreloadLink href="https://fonts.googleapis.com/css?family=Patrick+Hand" />
        <CssPreloadLink href="https://fonts.googleapis.com/css?family=Almendra+SC" />
        <CssPreloadLink href="https://fonts.googleapis.com/css?family=Almendra" />
      </Head>
      <Menu>
        <Component {...pageProps} />
      </Menu>
    </>
  );
}

function Menu({ children }: { children: ReactNode }) {
  const [ancestries, setAncestries] = useState<Array<Ancestry>>([]);

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/ancestries", {
        method: "POST",
      });
      const ancestries = (await response.json()) as Array<Ancestry>;
      setAncestries(ancestries);
    })();
  }, []);

  return (
    <Main logo={"/ZweihanderLogo.png"} screens={screens({ ancestries })}>
      {children}
    </Main>
  );
}

const screens = ({
  ancestries,
}: {
  ancestries: Array<Ancestry>;
}): Array<MenuItem> => [
  { path: "characters", name: "Characters", icon: "/menu/child.png" },
  {
    name: "Ancestries",
    icon: "/menu/dwarf.png",
    items: ancestries.map((ancestry) => ({
      name: ancestry.name,
      icon: "/menu/dwarf.png",
      path: `ancestries/${ancestry.code}`,
    })),
  },
  {
    path: "professions/:profession?",
    name: "Professions",
    icon: "/menu/businessman.png",
  },
  { path: "talents", name: "Talents", icon: "/menu/talent.png" },
  {
    name: "Magic",
    icon: "/menu/wand.png",
    items: [
      {
        name: "Generalists",
        icon: "/menu/magic-hat.png",
        path: "magic/generalists",
      },
      {
        name: "Arcana",
        icon: "/menu/book.png",
        path: "magic/arcanas",
      },
      {
        name: "Prayers",
        icon: "/menu/prayer.png",
        path: "magic/prayers",
      },
      {
        name: "Covenants",
        icon: "/menu/wicca.png",
        path: "magic/covenants",
      },
    ],
  },
  { path: "creatures", name: "Creatures", icon: "/menu/monster.png" },
];

function CssPreloadLink({ href }: { href: string }) {
  return <link rel="preload" href={href} as="font" crossOrigin="" />;
}
