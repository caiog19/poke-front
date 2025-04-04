import { fetchPokemonList } from "@/services/pokeapi";

fetchPokemonList(0, 14).then(data =>
{
    console.log("Pokemons: ", data.results);
}
);