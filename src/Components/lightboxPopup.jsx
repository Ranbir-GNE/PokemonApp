import React, { useState, useEffect } from "react";
import axios from "axios";

const LightboxPopup = ({ item, closeLightbox }) => {
  const [pokemonData, setPokemonData] = useState(null);
  console.log({item})

  const getPokemon = async () => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${item.name.toLowerCase()}`
      );
      if (response) {
        const data = response.data;
        setPokemonData(data);
        console.log(data.cries.latest)
      } else {
        console.error("Pokémon not found");
      }
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
    }
  };

  useEffect(() => {
    getPokemon();
  }, [item.name]);
  console.log({pokemonData})
  
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50 animate-fadeIn">
      <div className="bg-white p-6 rounded-lg shadow-lg relative max-w-md w-full">
        <button
          className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 active:bg-red-700 transition-colors duration-200"
          onClick={closeLightbox}
        >
          Close
        </button>

        <div className="flex flex-col items-center space-y-6">
          <div>
            {pokemonData && (
              <img //image
                src={
                  pokemonData.sprites.other["official-artwork"].front_default
                }
                alt={pokemonData.name}
                className="h-32 w-32 transition-transform duration-300 ease-in-out hover:scale-125"
              />
            )}
          </div>

          <div className="text-center">
            {" "}
            //pokemon details
            <h2 className="text-2xl font-bold mb-2">{item.name}</h2>
            <p className="text-sm text-gray-600">
              Base Experience: {pokemonData?.base_experience || "-"}
            </p>
          </div>

          {pokemonData ? (
            <div className="text-left w-full">
              <p className="mb-2">
                <span className="font-bold">Type:</span>{" "}
                {pokemonData.types
                  .map((typeInfo) => typeInfo.type.name)
                  .join(", ")}
              </p>
              <p>
                <span className="font-bold">Height:</span> {pokemonData.height}
              </p>
              <p>
                <span className="font-bold">Weight:</span> {pokemonData.weight}
              </p>
              <p>
                <span className="font-bold">Abilities:</span>{" "}
                {pokemonData.abilities
                  .map((abilityInfo) => abilityInfo.ability.name)
                  .join(", ")}
              </p>
            </div>
          ) : (
            <p>Loading Pokémon data...</p>
          )}

          <div>
            {console.log(item.cries)}
            {pokemonData?.cries && (
              <audio controls className="mt-4">
                <source src={pokemonData.cries.latest} type="audio/mpeg" /> //pokemon
                audio Your browser does not support the audio element.
              </audio>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LightboxPopup;
