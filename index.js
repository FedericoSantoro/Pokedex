const wantedPokemon = document.getElementById("pokemonId"),
  searchButton = document.getElementById("search"),
  formulario = document.getElementById("form");
const cardContainer = document.getElementById("cards-container");

async function getPokemon() {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${wantedPokemon.value}`
    );
    let data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
}

async function searchPokemon(e) {
  try {
    let tipos;
    e.preventDefault();
    const pokemon = await getPokemon();
    console.log(pokemon);
    cardContainer.innerHTML = `
            <div class="card-container">
                <img class="foto" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                  wantedPokemon.value
                }.png" />
                  <h2 class="nombre">${pokemon.name}</h2>
                      <div class="tipos">
                          ${(tipos = pokemon.types
                            .map((element) => {
                              return `<h3 class="tipo ${element.type.name}">${element.type.name}</h3>`;
                            })
                            .join(""))}
                      </div>
                  <div class="altura-peso">
                      <h3 class="altura">Altura: ${pokemon.height / 10}mts</h3>
                      <h3 class="peso">Peso: ${pokemon.weight / 10}kg</h3>
                  </div>
            </div>
        `;
        formulario.reset();
  } catch (e) {
    if (wantedPokemon.value.length === 0) {
      cardContainer.innerHTML = `
        <h2> Ingrese un ID de pokemon por favor </h2>
        `;
    } else {
      cardContainer.innerHTML = `
        <h2> Pokemon no Encontrado </h2>
        `;
    }
  }
}

function init() {
  formulario.addEventListener("submit", searchPokemon);
}

init();
