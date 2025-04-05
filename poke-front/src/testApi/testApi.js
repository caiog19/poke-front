import {
    fetchPokemonList,
    fetchPokemonDetails,
    fetchPokemonSpecies,
    fetchEvolutionChain,
    fetchPokemonByType,
  } from '@/services/pokeapi';
  
  async function testPokeApi() {
    try {
      const list = await fetchPokemonList(0, 10);
      console.log('Lista de Pokemon:', list?.results);
      list?.results.forEach(pokemon => console.log(`- ${pokemon.name}`));
  
      const details = await fetchPokemonDetails(1);
      console.log('Detalhes do Pokemon:');
      console.log('Nome:', details.name);
      console.log('Tipos:', details.types.map(t => t.type.name).join(', '));
      console.log('Sprite:', details.sprites.front_default);
      console.log('Ataques(5):', details.moves.slice(0, 5).map(m => m.move.name));
  
      const species = await fetchPokemonSpecies(1);
      console.log('Espécie do Pokemon:', species);
      console.log('URL da evolução:', species.evolution_chain.url);
  
      const evolution = await fetchEvolutionChain(1);
      console.log('Cadeia Evolutiva:', evolution);
      const evolutionChain = parseEvolutionChain(evolution.chain);
      console.log('Evolução:', evolutionChain.join(' -> '));
  
      const fireType = await fetchPokemonByType('fire');
      console.log('Pokemons de Fogo: ', fireType?.pokemon.map(p => p.pokemon.name));
    } catch (error) {
      console.error('Erro ao testar API:', error);
    }
  }
  
  function parseEvolutionChain(chain) {
    const result = [];
    let current = chain;
    while (current) {
      result.push(current.species.name);
      current = current.evolves_to[0]; 
    }
    return result;
  }

  testPokeApi();
  