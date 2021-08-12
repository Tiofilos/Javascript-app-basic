let pokemonList = [
    {name: 'Bulbasaur', height: 7, types:['grass', 'poison'] },
    {name: 'Beedrill', height: 5, types:['bug', 'poison'] },
    {name: 'Butterfree', height: 2, types:['bug', 'flying'] }
];

for (let i = 0; i < pokemonList.length; i++){
    let pokemon = pokemonList[i].name + '(height: ' + pokemonList[i].height + ')';
    if (pokemonList[i].height > 3){
        document.write(pokemon + "- That's big! <br>");
    }
    else{
        document.write(pokemon + '<br>');
    }
} 




