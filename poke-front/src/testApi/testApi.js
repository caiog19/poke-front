import { fetchPokemonList } from "@/services/pokeapi";
import { fetchPokemonDetails } from "@/services/pokeapi";

fetchPokemonList(0, 14).then(data =>
{
    console.log("Pokemons: ", data.results);
}
);

fetchPokemonDetails(2).then(data=>{
    console.log("detalhes: ", data)
});