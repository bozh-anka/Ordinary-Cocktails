/*Get json from api and filter through it with functions
* have a function generate the image + name preview n click redirect to new page and fetch details
*/

window.onload=function(){

    //Link to ordinary drinks
    const apiDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink';

    //Defining array to store the cocktail list
    let cocktails = [];

    //Fetch list
    fetch(apiDrinks)
        .then(response =>
        response.json())
        .then(data => {

            //Debug console.log(data);

            //Iterate through the list
            for (let i = 0; i < data.drinks.length; i++) {

                //Creating object for drink details
                let drink = {

                    drinkName: data.drinks[i].strDrink,
                    drinkPic: data.drinks[i].strDrinkThumb,
                    drinkId: data.drinks[i].idDrink
                };

                //Add to array
                cocktails [i] = drink;

                //Debug console.log(cocktails[i]);
            }
            //Generate cocktail images on page

            LoadImages(cocktails);

          //Debug console.log('In the fetch',cocktails[0].drinkName);
           //Debug console.log(cocktails[1]);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    //Debug console.log(cocktails);

    //Once script is executed remove loading icon
    let load = document.getElementById('loading');
    load.style.visibility = 'hidden';
}

//Generate pseudo random number for the photo tilt
function RandomNumber(index) {
    let num = Math.random(index) *(3 - - 3 +1);
    if (index % 5 === 0) {
        num = -Math.abs(num);
    }
    return num;
}

// Function to create and append the list items
function LoadImages(imageArray) {
    // Get the list element from the HTML.
    const list = document.getElementById('imageList');

    // Loop through each image in the array.
    imageArray.forEach((image, index) => {

        // Create a new list item for each image.
        const listItem = document.createElement('li');
        // Set a key attribute for the list item using the image title, converted to lowercase.
        listItem.setAttribute('key', image.drinkName);
        listItem.setAttribute('id', image.drinkId);


        // Create a div to hold the image.
        const imageDiv = document.createElement('div');
        // Add a class to the div for styling purposes.
        imageDiv.className = 'imageImage';

        // Create an img element for the image and set attributes.
        const img = document.createElement('img');
        img.src = image.drinkPic + '/preview';
        img.alt = image.drinkName;

        // Create a h3 element for the image title and set attributes.
        const title = document.createElement('h3');
        title.className = 'imageTitle';
        title.textContent = image.drinkName;

        let number = RandomNumber(index);
        //title.style.transform = `rotate(${number}deg)`;

        // Append the img element to the imageDiv.
        imageDiv.appendChild(img);
        // Append the imageDiv and title to the listItem.
        listItem.appendChild(imageDiv);
        listItem.appendChild(title);
        listItem.style.transform = `rotate(${number}deg)`
        // Append the listItem to the list.
        list.appendChild(listItem);

        //clicking image functionality
        document.getElementById(image.drinkId).onclick = function() {
            localStorage.setItem('drinkId', image.drinkId);
            location.href = "CocktailDetails.html";
        };

    });

}

