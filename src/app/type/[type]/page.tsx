"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Pokemon {
  name: string;
  url: string;
  image: string;
}

export default function TypePage({ params }: { params: { type: string } }) {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  // タイプ別でポケモンのデータを取得
  useEffect(() => {
    async function fetchPokemonsByType() {
      const response = await fetch(
        `https://pokeapi.co/api/v2/type/${params.type}`
      );
      const data = await response.json();
      const pokemonList = await Promise.all(
        data.pokemon.map(async (p: any) => {
          const pokemonResponse = await fetch(p.pokemon.url);
          const pokemonData = await pokemonResponse.json();
          return {
            name: p.pokemon.name,
            url: p.pokemon.url,
            image: pokemonData.sprites.front_default,
          };
        })
      );
      setPokemons(pokemonList);
    }
    fetchPokemonsByType();
  }, [params.type]);

  return (
    <div className="container mx-auto px-4 mt-4">
      <h1 className="text-4xl font-bold mb-4">
        {params.type.charAt(0).toUpperCase() + params.type.slice(1)}
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pokemons.map((pokemon) => (
          <Link
            href={`/pokemon/${pokemon.name}`}
            key={pokemon.name}
            className="p-4 border rounded-lg hover:bg-gray-100 flex flex-col items-center"
          >
            <img
              src={pokemon.image}
              alt={pokemon.name}
              width={150}
              height={120}
            />
            <span className="mt-2 text-center">{pokemon.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
