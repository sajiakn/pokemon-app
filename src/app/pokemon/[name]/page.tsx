/**
 * v0 by Vercel.
 * @see https://v0.dev/t/W5YXn9pPO1c
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";

import { useEffect, useState } from "react";
import { BoltIcon } from "@/components/icon";

interface Pokemon {
  name: string;
  types: { type: { name: string } }[];
  sprites: { front_default: string };
  stats: { base_stat: number; stat: { name: string } }[];
  abilities: { ability: { name: string } }[];
}

export default function PokemonDetail() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    // URLからポケモン名を取得
    const pokemonName = window.location.pathname.split("/").pop();
    setName(pokemonName || null);
  }, []);

  useEffect(() => {
    if (name) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then((response) => response.json())
        .then((data) => setPokemon(data))
        .catch((error) =>
          console.error("Failed to acquire Pokémon data.", error)
        );
    }
  }, [name]);

  if (!pokemon) return <div>Loading...</div>;

  return (
    <div className="bg-background text-foreground">
      <section className="w-full pt-12 md:pt-24 lg:pt-32">
        <div className="container flex flex-col items-center space-y-10 xl:space-y-16">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                Pokémon Pokédex
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Explore the details of your favorite Pokémon.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center space-y-6 md:space-y-8 lg:space-y-10">
            <div className="flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-8 lg:space-x-12">
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                width="300"
                height="300"
                className="rounded-2xl shadow-lg"
                style={{ aspectRatio: "300/300", objectFit: "cover" }}
              />
              <div className="space-y-2 text-center md:text-left">
                <h2 className="text-3xl font-bold">{pokemon.name}</h2>
                <div className="flex items-center justify-center space-x-2 md:justify-start">
                  <div className="rounded-md bg-primary px-3 py-1 text-primary-foreground">
                    {pokemon.types.map((type) => (
                      <span key={type.type.name}>{type.type.name}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg bg-muted p-4">
                <h3 className="text-lg font-bold">Stats</h3>
                {/* ステータス */}
                <div className="grid grid-cols-2 gap-4 pt-4">
                  {pokemon.stats.map((stat) => (
                    <div key={stat.stat.name} className="space-y-1">
                      <div className="text-sm text-muted-foreground">
                        {stat.stat.name.replace("-", " ").toUpperCase()}
                      </div>
                      <div className="text-2xl font-bold">{stat.base_stat}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-lg bg-muted p-4">
                <h3 className="text-lg font-bold">Abilities</h3>
                <div>
                  {pokemon.abilities.map((ability) => (
                    <div key={ability.ability.name}>
                      <ul className="space-y-2 pt-4">
                        <li>
                          <div className="flex items-center space-x-2">
                            <BoltIcon className="h-5 w-5" />
                            <div>{ability.ability.name}</div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-lg bg-muted p-4">
                <h3 className="text-lg font-bold">Description</h3>
                <p className="pt-4 text-muted-foreground">説明</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
