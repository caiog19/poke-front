const BASE_URL = 'https://pokeapi.co/api/v2';

export async function fetchPokemonList(offset = 0, limit = 20) {
    
    try {
        
        const res = await fetch(`${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`);
        if(!res.ok) throw new Error('Erro ao buscar lista de pokemon');
        return await res.json();

    } catch(error){

        console.error(error);
        return null;

    }

}


export async function fetchPokemonDetails(nameOrId){

    try {

       const res = await fetch(`${BASE_URL}/pokemon/${nameOrId}`);
        if(!res.ok) throw new Error("Erro ao buscar os detalhes");
        return await res.json();
        
    } catch (error) {
        console.error(error);
        return null;
    }

}


export async function fetchPokemonSpecies(nameOrId){

    try {

        const res = await fetch(`${BASE_URL}/pokemon-species/${nameOrId}`);
        if (!res.ok) throw new Error("Erro ao buscar as espécies");
        return await res.json();
        
    } catch (error) {
        console.error(error);
        return null;
    }

}


export async function fetchEvolutionChain(urlOrId) {
    try {
      const url = typeof urlOrId === 'string' && urlOrId.startsWith('http')
        ? urlOrId
        : `${BASE_URL}/evolution-chain/${urlOrId}`;
  
      const res = await fetch(url);
      if (!res.ok) throw new Error("Erro ao buscar evolução");
      return await res.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  


export async function fetchPokemonByType(typeName){
    try {
        const res = await fetch(`${BASE_URL}/type/${typeName}`);
        if(!res.ok) throw new Error("Erro ao buscar lista de pokemons do tipo: ", typeName);
        return await res.json();

    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function fetchAllTypes() {
    try {
      const res = await fetch(`${BASE_URL}/type`);
      if (!res.ok) throw new Error('Erro ao buscar os tipos');
      return await res.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  