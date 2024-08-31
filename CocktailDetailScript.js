window.onload = function () {
    let drinkId = localStorage.getItem("drinkId");
    console.log(drinkId);

    let byId = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + JSON.parse(drinkId);
    let drink;
    fetch(byId)
        .then(response => response.json())
        .then((data) => {
        console.log(data.drinks[0]);
            //fetching container
            const contr = document.getElementById('div');

            //Creating title
            const drinkName = document.createElement('h1');
            drinkName.className = 'drinkName';
            drinkName.textContent = data.drinks[0].strDrink;
            contr.appendChild(drinkName);

            //Displaying image
            const imgD = document.createElement('div');
            const drinkImg = document.createElement('img');
            drinkImg.src = data.drinks[0].strDrinkThumb ;
            drinkImg.alt = data.drinks[0].strDrink; //alt text
            imgD.appendChild(drinkImg);
            contr.appendChild(imgD);

            //id reference
            /*
            <div class = "container" id = "div">
                <ul id = 'ingredients'></ul>
                <ul id = 'category'></ul>
                <ul id = 'glass'></ul>
                <ul id = 'instructions'></ul>
             </div>
            */
            const ingrList = document.getElementById('ingredients');
            for (let i = 1; i < 16; i ++) {
                //console.log(eval(`data.drinks[0].strIngredient${i}`));
                if (eval(`data.drinks[0].strIngredient${i}`) !== null && eval(`data.drinks[0].strMeasure${i}`) !== null) {
                    //console.log(`Ingredient with measure`);

                    // create list item that has measurement and ingredient together
                    const ingrI = document.createElement('li');
                    ingrI.textContent = eval(`data.drinks[0].strMeasure${i}`) + " " + eval(`data.drinks[0].strIngredient${i}`);
                    ingrList.appendChild(ingrI);
                } else if (eval(`data.drinks[0].strMeasure${i}`) == null && eval(`data.drinks[0].strIngredient${i}`) !== null  ){

                    //create list item that has ingredient with no measurement
                    const ingrI = document.createElement('li');
                    ingrI.textContent = eval(`data.drinks[0].strIngredient${i}`);
                    ingrList.appendChild(ingrI);
                }
                else {
                    break;
                }
            }
    }).catch(error => {
        console.log('Error',error);
    })}

