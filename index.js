const wantedPokemonId = document.getElementById("pokemonId");
const wantedPokemonName = document.getElementById("pokemonName");
const formularioId = document.getElementById("formId");
const formularioName = document.getElementById("formName");
const cardContainer = document.getElementById("cards-container");

async function getPokemonId(id) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    let data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
}

async function searchPokemonId(e) {
  try {
    e.preventDefault();
    const pokemon = await getPokemonId(wantedPokemonId.value);
    console.log(pokemon);
    cardContainer.innerHTML = `
            <div class="card-container">
                <img class="foto" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                  wantedPokemonId.value
                }.png" />
                  <h2 class="nombre">${pokemon.name}</h2>
                      <div class="tipos">
                          ${pokemon.types
                            .map((element) => {
                              return `<h3 class="tipo ${element.type.name}">${element.type.name}</h3>`;
                            })
                            .join("")}
                      </div>
                  <div class="altura-peso">
                      <h3 class="altura">Altura: ${pokemon.height / 10}mts</h3>
                      <h3 class="peso">Peso: ${pokemon.weight / 10}kg</h3>
                  </div>
            </div>
        `;
    formularioId.reset();
  } catch (e) {
    if (wantedPokemonId.value.length === 0) {
      cardContainer.innerHTML = `
        <h2 class="error"> Ingrese un Nombre o ID de pokemon por favor </h2>
        `;
    } else {
      cardContainer.innerHTML = `
        <h2 class="error"> Pokemon no Encontrado </h2>
        `;
    }
    formularioId.reset();
  }
}

async function searchPokemonName(e) {
  try {
    e.preventDefault();
    const pokemon = await getPokemonId(wantedPokemonName.value);
    console.log(pokemon);
    cardContainer.innerHTML = `
            <div class="card-container">
                <img class="foto" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                  pokemon.id
                }.png" />
                  <h2 class="nombre">${pokemon.name}</h2>
                      <div class="tipos">
                          ${pokemon.types
                            .map((element) => {
                              return `<h3 class="tipo ${element.type.name}">${element.type.name}</h3>`;
                            })
                            .join("")}
                      </div>
                  <div class="altura-peso">
                      <h3 class="altura">Altura: ${pokemon.height / 10}mts</h3>
                      <h3 class="peso">Peso: ${pokemon.weight / 10}kg</h3>
                  </div>
            </div>
        `;
    formularioName.reset();
  } catch (e) {
    if (wantedPokemonName.value.length === 0) {
      cardContainer.innerHTML = `
        <h2 class="error"> Ingrese un Nombre o ID de pokemon por favor </h2>
        `;
    } else {
      cardContainer.innerHTML = `
        <h2 class="error"> Pokemon no Encontrado </h2>
        `;
    }
    formularioName.reset();
  }
}

function init() {
  formularioId.addEventListener("submit", searchPokemonId);
  formularioName.addEventListener("submit", searchPokemonName);
}

init();
