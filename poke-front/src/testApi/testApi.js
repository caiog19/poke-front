import {
    fetchPokemonList,
    fetchPokemonDetails,
    fetchPokemonSpecies,
    fetchEvolutionChain,
    fetchPokemonByType,
  } from '@/services/pokeapi';
  
  async function testPokeApi() {
    try {
      const list = await fetchPokemonList(0, 14);
      console.log('Lista de Pokemon:', list?.results);
  
      const details = await fetchPokemonDetails(1);
      console.log('Detalhes do Pokemon:', details);
  
      const species = await fetchPokemonSpecies(1);
      console.log('Espécie do Pokemon:', species);
  
      const evolution = await fetchEvolutionChain(1);
      console.log('Cadeia Evolutiva:', evolution);
  
      const fireType = await fetchPokemonByType('fire');
      console.log('Pokemons de Fogo: ', fireType?.pokemon.map(p => p.pokemon.name));
    } catch (error) {
      console.error('Erro ao testar API:', error);
    }
  }
  
  testPokeApi();
  