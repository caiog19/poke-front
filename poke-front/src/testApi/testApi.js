import { fetchPokemonList } from "@/services/pokeapi";
import { fetchPokemonDetails } from "@/services/pokeapi";
import { fetchPokemonSpecies } from "@/services/pokeapi";

fetchPokemonList(0, 14).then(data =>
{
    console.log("Pokemons: ", data.results);
}
);

fetchPokemonDetails(1).then(data=>{
    console.log("detalhes: ", data)
});

fetchPokemonSpecies(1).then(data=>{
    console.log("especie: ", data)
});