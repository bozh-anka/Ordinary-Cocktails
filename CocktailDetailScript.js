window.onload = function () {
    //Accessing the ID of the clicked cocktail through the browser's local storage
    let drinkId = localStorage.getItem("drinkId");
    //Debug console.log(drinkId);

    //url for finding cocktail by ID
    let byId = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + JSON.parse(drinkId);

    //Getting cocktail details
    fetch(byId)
        .then(response => response.json())
        .then((data) => {
        //Debug console.log(data.drinks[0]);
            //Fetching content container
            const contr = document.getElementById('div');

            //Fetching image container
            const imgD = document.getElementById('imageDiv');

            //Replacing loading gif with cocktail image
            const drinkImg = document.getElementById('img');
            drinkImg.src = data.drinks[0].strDrinkThumb ;
            drinkImg.alt = data.drinks[0].strDrink + ' cocktail photograph.'; //alt text is the drink's name
            drinkImg.className = 'img';

            //Adding the drink's name as the label overtop the photograph
            //This replaces the loading label
            const drinkName = document.getElementById('label');
            drinkName.textContent = data.drinks[0].strDrink;

            //Appending the cocktail's name to the image
            imgD.appendChild(drinkName);
            //Appending the image to its container
            imgD.appendChild(drinkImg);
            //Adding the image and name container to the main container
            contr.appendChild(imgD);

            //Populating ingredients list
            GetIngredients(data.drinks[0]);

            //Adding drink category and glass type
            const catL = document.getElementById('category');
            catL.textContent += data.drinks[0].strCategory;
            const glass = document.getElementById('glass');
            glass.textContent += data.drinks[0].strGlass;

            //Populating instructions
            GetInstructions(data.drinks[0]);

    }).catch(error => {
        console.log('Error',error);
    })}




function GetInstructions(data) {
    //Fetch instructions paragraph
    const instructions = document.getElementById('instructions');
    if (data.strInstructions === null || data.strInstructions === "") {
        //If no instructions
        instructions.textContent += 'Enjoy!';
    } else {
        //Else append instructions to the paragraph
        instructions.textContent += ' ' + data.strInstructions;}
}

function GetIngredients(data){

    //Fetch ingredient list element
    const ingrList = document.getElementById('ingredients');

    //The database has 15 ingredient slots this loop goes through each slot and its matching measurement
    for (let i = 1; i < 16; i ++) {

        //Debug console.log(eval(`data.drinks[0].strIngredient${i}`));

        //If the ingredient and measure slots for i are not null
        if (eval(`data.strIngredient${i}`) !== null && eval(`data.strMeasure${i}`) !== null) {
            //Debug console.log(`Ingredient with measure`);

            // create list item that has measurement and ingredient together and display
            const ingrI = document.createElement('li');
            ingrI.textContent = eval(`data.strMeasure${i}`) + " " + eval(`data.strIngredient${i}`);
            ingrList.appendChild(ingrI);

            //If an ingredient has no matching measurement
        } else if (eval(`data.strMeasure${i}`) == null && eval(`data.strIngredient${i}`) !== null  ){

            //create list item that has ingredient with no measurement
            const ingrI = document.createElement('li');
            ingrI.textContent = eval(`data.strIngredient${i}`);
            ingrList.appendChild(ingrI);
        }
        else {
            //Remaining option is null ingredient, this means we are done
            break; //No more ingredients left -> exit for loop
        }
    }
}