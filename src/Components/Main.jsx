import React, { useState, useEffect } from "react";
import Card from "./Card";
import Pokeinfo from "./Pokeinfo";
import axios from "axios";
const Main = () => {
    const [pokeData, setPokeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [pokeDex, setPokeDex] = useState("");
  
    useEffect(() => {
      const fetchAllPokemon = async () => {
        try {
          setLoading(true);
  
          // Fetch all Pokémon data from the API
          const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=2000");
  
          // Extract the individual URLs for each Pokémon
          const pokemonUrls = response.data.results.map((pokemon) => pokemon.url);
  
          // Fetch details for each Pokémon
          const pokemonDetails = await Promise.all(
            pokemonUrls.map(async (url) => {
              const result = await axios.get(url);
              return result.data;
            })
          );
  
          setPokeData(pokemonDetails);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching Pokémon data:", error);
          setLoading(false);
        }
      };
  
      fetchAllPokemon();
    }, []);
  
    const handleSearch = (event) => {
      setSearchTerm(event.target.value);
    };
  
    const filteredPokemon = pokeData.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    return (
      <>
        <div className="container">
          <div className="left-content">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search Pokemon"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <Card
              pokemon={filteredPokemon}
              loading={loading}
              infoPokemon={(poke) => setPokeDex(poke)}
            />
          </div>
          <div className="right-content">
            <Pokeinfo data={pokeDex} />
          </div>
        </div>
      </>
    );
  };
  
  export default Main;