window.onload = function () {
    let drinkId = localStorage.getItem("drinkId");
    console.log(drinkId);

    let byId = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + JSON.parse(drinkId);
    let drink;
    fetch(byId)
        .then(response => response.json())
        .then((data) => {
        console.log(data.drinks[0]);
            const contr = document.getElementById('div');
            const drinkName = document.createElement('h1');
            drinkName.className = 'drinkName';
            drinkName.textContent = data.drinks[0].strDrink;

            contr.appendChild(drinkName);


    }).catch(error => {
        console.log('Error',error);
    })}

