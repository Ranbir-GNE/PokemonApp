import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Components/navbar";
import LightboxPopup from "../Components/lightboxPopup";

export const HomePage = () => {
  const [data, setData] = useState([]);
  const [pokemonDetails, setPokemonDetails] = useState({}); // To store details of each Pokémon

  // Fetch Pokémon list
  const fetchData = async () => {
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=100&offset=0"
    );
    if (response) {
      const sortedData = response.data.results.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setData(sortedData);
      fetchPokemonDetails(sortedData); // Fetch details for each Pokémon
    }
  };

  // Fetch Pokémon sprites for each Pokémon
  const fetchPokemonDetails = async (pokemonList) => {
    const detailsPromises = pokemonList.map(async (pokemon) => {
      const response = await axios.get(pokemon.url);
      return {
        name: pokemon.name,
        sprite: response.data.sprites.front_default,
        types: response.data.types, //add type
      };
    });

    const details = await Promise.all(detailsPromises);
    const detailsMap = {};
    details.forEach((detail) => {
      detailsMap[detail.name] = detail.sprite;
    });

    setPokemonDetails(detailsMap);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const closeLightbox = () => {
    setSelectedItem(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Navbar />
      <div
        className="grid gap-8"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
        }}
      >
        {data.map((item) => (
          <div
            key={item.name}
            onClick={() => handleItemClick(item)}
            className="p-4 border border-gray-300 rounded-lg text-center cursor-pointer transform transition duration-300 hover:bg-blue-500 hover:text-white hover:scale-105 active:scale-95 shadow-md"
          >
            {" "}
            //array.from
            {pokemonDetails[item.name] && (
              <img //image display
                src={pokemonDetails[item.name]}
                alt={item.name}
                className="mx-auto mb-2"
                style={{ width: "80px", height: "80px" }}
              />
            )}
            <h1 className="text-xl capitalize">{item.name}</h1>
          </div>
        ))}
      </div>
      {selectedItem && (
        <LightboxPopup item={selectedItem} closeLightbox={closeLightbox} />
      )}
    </div>
  );
};
