const formulario = document.getElementById("formulario");
const campoPokemon = document.getElementById("pokemon");
const resultado = document.getElementById("resultado");
const mensagem = document.getElementById("mensagem");

async function buscarPokemon(nome) {

    const resposta = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${nome}`
    );

    if (!resposta.ok) {
        throw new Error("Pokémon não encontrado!");
    }

    return await resposta.json();
}
function mostrarPokemon(pokemon) {

    const nome = pokemon.name;
    const numero = pokemon.id;
    const imagem = pokemon.sprites.other["official-artwork"].front_default;

    const altura = pokemon.height / 10;
    const peso = pokemon.weight / 10;

    const tipos = pokemon.types.map(function(item) {

        let tipo = item.type.name;

        if (tipo === "fire") tipo = "Fogo";
        if (tipo === "water") tipo = "Água";
        if (tipo === "grass") tipo = "Planta";
        if (tipo === "electric") tipo = "Elétrico";
        if (tipo === "bug") tipo = "Inseto";
        if (tipo === "normal") tipo = "Normal";
        if (tipo === "poison") tipo = "Veneno";
        if (tipo === "ground") tipo = "Terra";
        if (tipo === "fairy") tipo = "Fada";
        if (tipo === "fighting") tipo = "Lutador";
        if (tipo === "psychic") tipo = "Psíquico";
        if (tipo === "rock") tipo = "Pedra";
        if (tipo === "ghost") tipo = "Fantasma";
        if (tipo === "ice") tipo = "Gelo";
        if (tipo === "dragon") tipo = "Dragão";
        if (tipo === "dark") tipo = "Sombrio";
        if (tipo === "steel") tipo = "Aço";
        if (tipo === "flying") tipo = "Voador";

        return `<span class="tipo">${tipo}</span>`;

    }).join("");

  
    const atributos = pokemon.stats.map(function(item) {

        let nomeAtributo = item.stat.name;

        if (nomeAtributo === "hp") nomeAtributo = "Vida";
        if (nomeAtributo === "attack") nomeAtributo = "Ataque";
        if (nomeAtributo === "defense") nomeAtributo = "Defesa";
        if (nomeAtributo === "speed") nomeAtributo = "Velocidade";

        const valor = item.base_stat;

      
        if (
            nomeAtributo !== "Vida" &&
            nomeAtributo !== "Ataque" &&
            nomeAtributo !== "Defesa" &&
            nomeAtributo !== "Velocidade"
        ) {
            return "";
        }

        return `
            <div class="atributo">

                <strong>${nomeAtributo}: ${valor}</strong>

                <div class="barra">
                    <div class="progresso"
                    style="width: ${Math.min(valor / 2.55, 100)}%">
                    </div>
                </div>

            </div>
        `;

    }).join("");

    resultado.innerHTML = `

        <div class="carta">

            <h2>Ficha do Pokémon</h2>

            <h3>${nome.toUpperCase()} #${numero}</h3>

            <img src="${imagem}" alt="${nome}">

            <h3>Tipos</h3>

            <div>
                ${tipos}
            </div>

            <div class="informacoes">

                <p><strong>Altura:</strong> ${altura} metros</p>

                <p><strong>Peso:</strong> ${peso} kg</p>

                <h3>Atributos</h3>

                ${atributos}

            </div>

        </div>
    `;
}


formulario.addEventListener("submit", async function(event) {

    event.preventDefault();

    const nome = campoPokemon.value.trim().toLowerCase();

   
    if (nome === "") {

        mensagem.textContent = "Digite o nome de um Pokémon!";
        resultado.innerHTML = "";

        return;
    }

    mensagem.textContent = "Buscando Pokémon...";
    resultado.innerHTML = "";

    try {

        const pokemon = await buscarPokemon(nome);

        mostrarPokemon(pokemon);

        mensagem.textContent = "Pokémon encontrado!";

    } catch (erro) {

        mensagem.textContent = "Pokémon não encontrado!";

    }

    campoPokemon.focus();

});
