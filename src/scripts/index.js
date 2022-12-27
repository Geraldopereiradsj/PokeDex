// function render(array) {
//     const mainList = document.querySelector('.main__ul')

//     mainList.innerHTML = ''

//     array.forEach(element => {
//         const cardPokemon = createCard(element)

//         mainList.append(cardPokemon)
//     })
// }





// function createCard({name, url}) {
//     const li = document.createElement('li')
//     li.classList.add('main__li')

//     const image = document.createElement('img')
//     image.classList.add('main__img')
//     image.alt = name
//     image.id = url
//     image.src = img

//     const span = document.createElement('span')
//     span.classList.add('main__pokemon')
//     span.innerText = name

//     li.append(image, span)

//     return li
// }


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
    const ulTag = document.querySelector('.main__ul')

    const listaDePokemons = await getAllPokemons()

    listaDePokemons.results.forEach(pokemon => {
        const numeroNaPokedex = pokemon.url.slice(34, -1)

        ulTag.insertAdjacentHTML('beforeend', `
            <li class="main__li">
                <img  class="main__img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${numeroNaPokedex}.png" alt=${pokemon.name}>
                <h3 class="main__pokemon">${pokemon.name}</h3>
            </li>
        `)
    })
}





getAllPokemons()
renderizaPokemons()




