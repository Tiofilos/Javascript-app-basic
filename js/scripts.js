let pokemonRepository = (function () {
  let pokemonList = [];

  // API link
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  // push pokemon
  function add(pokemon) {
    if (typeof pokemon === "object" && "name" in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }
  //returning pokemon list
  function getAll() {
    return pokemonList;
  }
  function addListItem(pokemon) {
    let list = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    listItem.classList.add("group-list-item");
    listItem.classList.add("col-lg-4", "col-md-6", "col");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("btn-lg", "btn-primary");
    button.dataset.target = "#exampleModal";
    button.dataset.toggle = "modal";
    listItem.appendChild(button);
    list.appendChild(listItem);

    //Event listener on a click of a button
    button.addEventListener("click", function (event) {
      showDetails(pokemon);
    });
  }

  //Fetching pokemon list from API
  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  //Fetching pokemon details from API
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        // Adding the details to the item
        item.imageUrl = details.sprites.front_default;
        item.types = details.types;
        item.height = details.height;
        item.weight = details.weight;
      })
      .catch(function (e) {
        console.error(e);
      });
  }
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }
  //Modal
  function showModal(pokemon) {
    let modalContent = document.querySelector(".modal-content");

    let modalHeader = document.querySelector(".modal-header");
    let modalBody = document.querySelector(".modal-body");
    let modalFooter = document.querySelector(".modal-footer");
    let buttonClose = document.querySelector("#close");
    let buttonX = document.querySelector("#button-x");

    let titleElement = document.createElement("h1");
    titleElement.innerText = pokemon.name;

    let contentElement = document.createElement("p");
    contentElement.innerText = "Height:" + pokemon.height;

    let weightElement = document.createElement("p");
    weightElement.innerText = "Weight:" + pokemon.weight;

    let imgElement = document.createElement("img");
    imgElement.src = pokemon.imageUrl;

    // modalContent.innerHTML = '';
    modalHeader.innerHTML = "";
    modalBody.innerHTML = "";

    //modal content
    modalHeader.appendChild(titleElement);
    modalBody.appendChild(contentElement);
    modalBody.appendChild(weightElement);
    modalBody.appendChild(imgElement);
    //modal botton buttons
    modalHeader.appendChild(buttonX); //close X button added
    modalFooter.appendChild(buttonClose); //Close btn-primary added
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modalContent.appendChild(modalFooter);
  }

  //search bar
  let searchInput = document.querySelector("#search-bar");
  searchInput.addEventListener("input", function () {
    let listPokemon = document.querySelectorAll("li");
    let value = searchInput.value.toUpperCase();

    listPokemon.forEach(function (pokemon) {
      if (pokemon.innerText.toUpperCase().indexOf(value) < 0) {
        pokemon.style.display = "none";
      }
    });
  });
  //This returns all the functions created
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetils: loadDetails,
    showModal: showModal,
    showDetails: showDetails,
  };
})();
// This loads the data
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

//This creates the 'change color' icon in navbar
function changeColor() {
  let body = document.querySelector("body");
  body.classList.toggle("change-color");
}
