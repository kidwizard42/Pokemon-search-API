const pokemonSearch = document.querySelector("#pokemonSearch")
const randomPokemon = document.querySelector("#randomPokemon");
const pokemonCard = document.querySelector("#pokemonCard")

const newCard = (name, frontImg, backImg, allPokemonTypes, flavorText) => {

  const newCardDiv = document.createElement("DIV");
  const newCardHeader = document.createElement("H6");
  const imgDiv = document.createElement("DIV");
  const imgOne = document.createElement("IMG");
  const imgTwo = document.createElement("IMG");
  const text = document.createElement("P");
  const deleteCard = document.createElement("SPAN");
  const typeDiv = document.createElement("DIV");
  const typeP = document.createElement("P");


  deleteCard.innerText = "X";
  newCardHeader.innerText = name;
  pokemonCard.append(newCardDiv);
  newCardDiv.append(newCardHeader);
  newCardDiv.append(imgDiv);
  imgDiv.append(imgOne);
  imgDiv.append(imgTwo);
  newCardDiv.append(typeDiv);
  typeDiv.append(typeP);
  typeP.innerText = "TYPES:"
  newCardDiv.append(text);
  text.innerHTML = flavorText;
  imgOne.src = frontImg;
  imgTwo.src = backImg;
  imgOne.alt = "";
  imgTwo.alt = "";
  newCardDiv.append(deleteCard);


  for (type of allPokemonTypes) {
    const pokemonType = document.createElement("DIV");
    pokemonType.innerText = type.type.name.toUpperCase();
    typeDiv.append(pokemonType);
    pokemonType.classList.add("type");
    pokemonType.classList.add(`${type.type.name}`);
    pokemonType.classList.add("typeSpace");
  }

  newCardDiv.classList.add("newCard");
  newCardHeader.classList.add("h6-name");
  deleteCard.classList.add("delete-button");
  imgDiv.classList.add("flexRow");
  imgDiv.classList.add("imgDiv");

  deleteCard.addEventListener("click", (e) => {
    newCardDiv.remove();
  })
}

randomPokemon.addEventListener("click", async (e) => {

  const pokemonNum = Math.floor((Math.random() * 898) + 1);
  const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonNum}/`);
  const allPokemonTypes = res.data.types;
  const pokeImage = await axios.get(res.data.forms[0].url);
  const frontImg = pokeImage.data.sprites.front_default;
  const backImg = pokeImage.data.sprites.back_default;
  const pokeText = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonNum}/`);

  let flavorText = pokeText.data.flavor_text_entries[1].flavor_text;
  const flavorTextArray = pokeText.data.flavor_text_entries;

  for (let i = 0; i < flavorTextArray.length; i++) {
    if (flavorTextArray[i].language.name == "en") {
      flavorText = pokeText.data.flavor_text_entries[i].flavor_text;
      break;
    }
  }


  newCard(res.data.forms[0].name.toUpperCase(), frontImg, backImg, allPokemonTypes, flavorText);

})

pokemonSearch.addEventListener("submit", async (e) => {
  e.preventDefault();
  // must give the input that you type into a name attribute to find it. in this case it's "search".
  // The one input element in the html if your lost

  const searchInput = pokemonSearch.elements.search.value.toLowerCase().trim();
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // I CHaNGED ALL VARIABLES FROM THIS EVENT TO VAR AND ADDED AN "S" AT THE END SO IT CAN BE RECOGNIZED OUTSIDE THE TRY CODE.
  // If i can refactor this in a better way in the future do so.
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  if (searchInput == "") {
    // alert("type something dipshit")
    pokemonSearch.elements.search.value = "";
  } else {
    try {
      // here is where i changed the variables.
      var resS = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchInput}/`);
      var allPokemonTypesS = resS.data.types;
      var pokeImageS = await axios.get(resS.data.forms[0].url);
      var frontImgS = pokeImageS.data.sprites.front_default;
      var backImgS = pokeImageS.data.sprites.back_default;
      var pokeTextS = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${searchInput}/`);
      var flavorTextS = pokeTextS.data.flavor_text_entries[1].flavor_text;

      const flavorTextArray = pokeTextS.data.flavor_text_entries;

      for (let i = 0; i < flavorTextArray.length; i++) {
        if (flavorTextArray[i].language.name == "en") {
          flavorTextS = pokeTextS.data.flavor_text_entries[i].flavor_text;
          break;
        }
      }

      newCard(resS.data.forms[0].name.toUpperCase(), frontImgS, backImgS, allPokemonTypesS, flavorTextS);
    } catch (err) {
      alert(`Sorry, we cannot find ${searchInput} or it is not in our database. Please check your spelling and try again`)
      console.log(err)
      pokemonSearch.elements.search.value = "";
    }
    pokemonSearch.elements.search.value = "";
  }
})
