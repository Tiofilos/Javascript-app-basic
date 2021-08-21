let pokemonRepository = (function (){
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    function add(pokemon) {
      if (
        typeof pokemon === "object" &&
        "name" in pokemon
      ) {
        pokemonList.push(pokemon);
      } else {
        console.log("pokemon is not correct");
      }
    }
    function getAll() {
        return pokemonList;
    }
    
    function addListItem(pokemon){
        let pokemonList = document.querySelector(".pokemon-list");
        let listpokemon = document.createElement("li");
            listpokemon.classList.add("group-list-item")
        let button = document.createElement("button");
            button.innerText = pokemon.name;
            button.classList.add("btn btn-primary");
            listpokemon.appendChild(button);
            pokemonList.appendChild(listpokemon);

        button.addEventListener("click", function(event) {
            showModal(pokemon);
        });
    function loadModal(pokemon) {
            let url = pokemon.ModalUrl;
            return fetch(url).then(function (response) {
              return response.json();
            }).then(function (Modal){
                // Now I add the Modal to the item
                pokemon.imageUrl = Modal.sprites.front_default;
                pokemon.height = Modal.height;
                pokemon.types = Modal.types;
                pokemon.weight = Modal.weight;
            }).catch(function (e) {
              console.error(e);
            });
          }     
    }
    function loadModal(pokemon) {
        let url = pokemon.ModalUrl;
        return fetch(url).then(function (response) {
          return response.json();
        }).then(function (Modal){
            // Now we add the Modal to the item
            pokemon.imageUrl = Modal.sprites.front_default;
            pokemon.height = Modal.height;
            pokemon.types = Modal.types;
            pokemon.weight = Modal.weight;
        }).catch(function (e) {
          console.error(e);
        });
      } 
      function loadList() {
        return fetch(apiUrl).then(function (response) {
          return response.json();
        }).then(function (json) {
          json.results.forEach(function (item) {
            let pokemon = {
              name: item.name,
              ModalUrl: item.url
            };
            add(pokemon);
            loadModal(pokemon);
          });
        }).catch(function (e) {
          console.error(e);
        })
      }
      
      
    
      let modalContainer = document.querySelector('#modal-container');
      function showModal(pokemon) {
        // Here I define what  modal looks like
        // Ensure modal-container is empty and add div wih class "modal"
        modalContainer.innerHTML = '';
        let modal = document.createElement('div');
        modal.classList.add('modal');
    
        // Add a close or exit button on the modal
        // Also add event listener on the close button
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);
    
        //Modal should have a title and I define the title here
        let titleElement = document.createElement('h1');
        titleElement.innerText = pokemon.name;
    
        //As with the title, I define the content
        let contentElement = document.createElement('p');
        contentElement.innerText = "Height: " + pokemon.height;
    
        let pokeWeight = document.createElement('p');
        pokeWeight.innerText = "Weight: " + pokemon.weight;
    
        let pokemonImage = document.createElement('img');
        pokemonImage.src = pokemon.imageUrl;
    
        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modal.appendChild(pokeWeight);
        modal.appendChild(pokemonImage);
        modalContainer.appendChild(modal);
    
        modalContainer.classList.add('is-visible');
      }
    
      function hideModal() {
        modalContainer.classList.remove('is-visible');
      }
    
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
          hideModal();  
        }
      });
    
      modalContainer.addEventListener('click', (e) => {
        // Since this is also triggered when clicking INSIDE the modal
        // We only want to close if the user clicks directly on the overlay
        let target = e.target;
        if (target === modalContainer) {
          hideModal();
        }
      });
    
      return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadModal: loadModal,
        showModal: showModal
      };
    })();
      
    pokemonRepository.loadList().then(function () {
      pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
      });
    });














/*pokemonList.forEach(function(property) {
    console.log(property);
  });*/

/*for (let i = 0; i < pokemonList.length; i++){
    let pokemon = pokemonList[i].name + '(height: ' + pokemonList[i].height + ')';
    if (pokemonList[i].height > 3){
        document.write(pokemon + "- That's big! <br>");
    }
    else{
        document.write(pokemon + '<br>');
    }
} */


  /*let button = document.createElement('button')
    button.innerText = ('<button></button>')
    button.classlist.add()
    element.appendChild(button)
});*/


/*let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  
    function add(pokemon) {
      if (
        typeof pokemon === "object" &&
        "name" in pokemon
      ) {
        pokemonList.push(pokemon);
      } else {
        console.log("pokemon is not correct");
      }
    }
    function getAll() {
      return pokemonList;
    }
    function addListItem(pokemon) {
      let pokemonList = document.querySelector(".pokemon-list");
      let listpokemon = document.createElement("li");
      let button = document.createElement("button");
      button.innerText = pokemon.name;
      button.classList.add("button-class");
      listpokemon.appendChild(button);
      pokemonList.appendChild(listpokemon);
      button.addEventListener("click", function(event) {
        showDetails(pokemon);
      });
    }
  
    function loadList() {
      return fetch(apiUrl).then(function (response) {
        return response.json();
      }).then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
          console.log(pokemon);
        });
      }).catch(function (e) {
        console.error(e);
      })
    }
  
    function loadDetails(item) {
      let url = item.detailsUrl;
      return fetch(url).then(function (response) {
        return response.json();
      }).then(function (details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      }).catch(function (e) {
        console.error(e);
      });
    } 
  
    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails,
      showDetails: showDetails
    };
  })();

  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      console.log(item);
    });
  }

  
  pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
  });
  
  
  
  
  
  
  
  
  
  
  
  
  
  let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=50';
  
  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon) {
      pokemonList.push(pokemon);
    } 
    else {
      console.log("pokemon is not correct");
    }
  }
  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    button.addEventListener("click", function(event) {
      showModal(pokemon);
    });
  }
  function loadModal(pokemon) {
    let url = pokemon.ModalUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (Modal){
        // Now we add the Modal to the item
        pokemon.imageUrl = Modal.sprites.front_default;
        pokemon.height = Modal.height;
        pokemon.types = Modal.types;
        pokemon.weight = Modal.weight;
    }).catch(function (e) {
      console.error(e);
    });
  } 
  
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          ModalUrl: item.url
        };
        add(pokemon);
        loadModal(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }
  
  

  let modalContainer = document.querySelector('#modal-container');
  function showModal(pokemon) {
    // Here we define what our modal looks like
    // Ensure modal-container is empty and add div wih class "modal"
    modalContainer.innerHTML = '';
    let modal = document.createElement('div');
    modal.classList.add('modal');

    // Add a close or exit button on the modal
    // Also add event listener on the close button
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    //Our modal should have a title and we define the title here
    let titleElement = document.createElement('h1');
    titleElement.innerText = pokemon.name;

    //As we did with the title, we define the content
    let contentElement = document.createElement('p');
    contentElement.innerText = "Height: " + pokemon.height;

    let pokeWeight = document.createElement('p');
    pokeWeight.innerText = "Weight: " + pokemon.weight;

    let pokemonImage = document.createElement('img');
    pokemonImage.src = pokemon.imageUrl;

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modal.appendChild(pokeWeight);
    modal.appendChild(pokemonImage);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');
  }

  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();  
    }
  });

  modalContainer.addEventListener('click', (e) => {
    // Since this is also triggered when clicking INSIDE the modal
    // We only want to close if the user clicks directly on the overlay
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadModal: loadModal,
    showModal: showModal
  };
})();
  
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
  */
