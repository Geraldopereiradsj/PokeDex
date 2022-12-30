const ulTag = document.querySelector('.main__ul')
const liTag = document.querySelector('.main__li')
const pokemonName = document.querySelector('.main__pokemon')
const pokemonImg = document.querySelector('.main__img')
const form = document.querySelector('.form')
const inputSearch = document.querySelector('.header__input')
const buttonSearch = document.querySelector('.header__button')
const carregar = document.querySelector('.carregar')
carregar.innerText = 'Carregando...';
const logo = document.querySelector('.header__img')



async function getAllPokemons() {
    const pokemons = await fetch('https://pokeapi.co/api/v2/pokemon?limit=302', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(res => {
            return res
        })

    return pokemons

}



async function renderizaPokemons() {
    const listaDePokemons = await getAllPokemons()
    
    listaDePokemons.results.forEach(pokemon => {
        const numeroNaPokedex = pokemon.url.slice(34, -1)
        
        ulTag.insertAdjacentHTML('beforeend', `
            <li class="main__li">
                <img  class="main__img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${numeroNaPokedex}.png" alt=${pokemon.name}>
                <h3 class="main__pokemon">${pokemon.name}</h3>
            </li>`);
    });
}


const fetchpokemon = async (pokemon) => {
    const ApiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`);

    if (ApiResponse.status == 200) {
        const data = await ApiResponse.json();
        return data;
    }
}


const renderPokemonByName = async (pokemon) => {
    carregar.innerText = 'Carregando...';
    ulTag.innerHTML = ''
    const data = await fetchpokemon(pokemon);


    if (data) {
        inputSearch.value = '';
        carregar.innerText = '';    
        ulTag.appendChild(liTag)
        pokemonName.innerText = data.name;
        pokemonImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

    } else if (inputSearch.value.toLowerCase() == 'todos') {
        pokemonName.innerText = '';
        pokemonImg.src = '';
        inputSearch.value = '';
        carregar.innerText = '';
       await renderizaPokemons();

       
    } else {
        carregar.innerText = '';
        pokemonImg.src = '';
        pokemonName.innerText = '';

    }

}
form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemonByName(inputSearch.value);
});

function renderAll() {
    logo.addEventListener('click', (event) => {
        carregar.innerText = '';
        ulTag.innerHTML = ''
        event.preventDefault()
        renderizaPokemons()
    })
}
renderAll()