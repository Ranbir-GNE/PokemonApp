import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchInput.trim() !== "") {
      const searchPokemon = async () => {
        try {
          let response;

          if (isNaN(searchInput)) {
            response = await fetch(
              `https://pokeapi.co/api/v2/pokemon/${searchInput.toLowerCase()}`
            );
          }

          if (response.ok) {
            const data = await response.json();
            setSearchResults([data]);
          } else {
            setSearchResults([]);
          }
        } catch (error) {
          console.error("Error fetching Pokémon data:", error);
          setSearchResults([]);
        }
      };

      searchPokemon();
    } else {
      setSearchResults([]);
    }
  }, [searchInput]);

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="bg-gray-800 text-white p-4">
      <h1 className="flex text-3xl font-bold mb-4 justify-center">PokeDex</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or type"
          value={searchInput}
          onChange={handleSearch}
          className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400"
        />
      </div>
      {searchResults.length > 0 && (
        <div className="bg-gray-700 p-4 rounded">
          {searchResults.map((pokemon, index) => (
            <div key={index} className="mb-2">
              <h3 className="text-xl font-semibold">{pokemon.name}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;
