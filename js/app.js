const API = axios.create({
    baseURL: "https://pokeapi.co/api/v2/",

    Headers: {
        "Content-Type": "application/json;charset=utf-8"
    }
})

plegable_menu.addEventListener("click", open_plegable_menu)
// window.addEventListener("load", loader)

let offset = 252;
let limit = 386;

let pokeList = []

const colors = {
    fire: '#d35c54',
	grass: '#b5d354',
	electric: '#d3ca54',
	water: '#547ad3',
	ground: '#d3ab54',
	rock: '#ba983c',
	poison: '#7f3cba',
	bug: '#748023',
	dragon: '#3c68ba',
	psychic: '#c051b3',
	flying: '#51c0ba',
	fighting: '#FF5D5D',
	normal: '#6f7878'
}

let counter = 0
const main_types = Object.keys(colors)


async function obtener_pokemon(id) { //manda a crear una tarjeta sobre pokemones de 1 a 1 en base al iterador de abajo
    const { data } = await API(`pokemon/${id}`)

    crear_pokecard(data)
}

const obtener_pokemones = async (offset, limit) => { // iterador para conseguir todos los pokemones
    for (let i = offset; i <= limit; i++) {
        await obtener_pokemon(i);
    }
}


async function crear_pokecard(pokemons) {
    const { data } = await API("pokemon-species/1")
    const poke = data.varieties // aca esta el problema 

    const poke_types = pokemons.types.map(type => type.type.name);
	const type = main_types.find(type => poke_types.indexOf(type) > -1);
    const color = colors[type]

    poke.forEach(pokemonElement => {
        let pokeCard = document.createElement("div")

        let leftContainer = document.createElement("div")
        let pokename = document.createElement("h2")
        let containerLeftStats = document.createElement("div")

        let hpStat = document.createElement("h3")
        let atkStat = document.createElement("h3")

        let rightContainer = document.createElement("div")
        let pokeImg = document.createElement("img")

        pokeCard.classList.add("pokecard")
        leftContainer.classList.add("left-container")
        pokename.classList.add("pokename")
        containerLeftStats.classList.add("container-left-stats")
        rightContainer.classList.add("right-container")
        pokeImg.classList.add("pokeImg")
        pokeCard.setAttribute("id", "pokeCard");

        pokeImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/734d9bbad785ccb5dd5151293d11a65cea29f6ca/sprites/pokemon/other/dream-world/${pokemons.id}.svg`
        pokeCard.style.backgroundColor = color

        pokename.setAttribute("id", "pokeName")
        pokename.textContent = pokemons.name
        hpStat.textContent = `hp: ${pokemons.stats[0].base_stat}`
        atkStat.textContent = `atk: ${pokemons.stats[1].base_stat}`

        container_centered.append(pokeCard)

        pokeCard.append(leftContainer)
        leftContainer.append(pokename)
        leftContainer.append(containerLeftStats)
        containerLeftStats.append(hpStat)
        containerLeftStats.append(atkStat)

        pokeCard.append(rightContainer)
        rightContainer.append(pokeImg)

        pokeList.push(pokemons)
        
    })
}

function open_plegable_menu() {
    counter++

    if (counter % 2 == 0) {
        plegable_menu_gens.style.display = "none"
    }
    else{
        plegable_menu_gens.style.display = "block"
    }
}

// function loader() {
//     if (true) {

//     }
// }

window.onscroll = function(){
    var top = window.scrollY;
    if (top >=61){
        header.classList.add("glassmorphism")
        plegable_menu_gens.classList.add("glassmorphism")
        header.style.background = "#FFFFFF00"
        header.style.borderRadius = "0px 0px 10px 10px"
        header.style.boxShadow = "0 4px 30px #0000001a"
        header.style.border = "1px solid #ffffff4d"
        header.style.boxShadow = "0 4px 30px rgba(0, 0, 0, 0.1)"
        header.style.color = "#001d40"
    }else{
        header.classList.remove('glassmorphism');
        header.style.backgroundColor = "#315659"
        header.style.borderRadius = "0px"
        header.style.border = "none"
        header.style.color = "#C6E0FF"
    }
}

obtener_pokemones(offset, limit)
