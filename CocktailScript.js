/*Get json from api and filter through it with functions
* have a function generate the image + name preview n click redirect to new page and fetch details
*
* */


window.onload=function(){
    const apiDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink';
    let cocktails = [];
    fetch(apiDrinks)
        .then(response =>
        response.json())
        .then(data => {

            //console.log(data);
            for (let i = 0; i < data.drinks.length; i++) {
                let drink = {
                    drinkName: data.drinks[i].strDrink,
                    drinkPic: data.drinks[i].strDrinkThumb,
                    drinkId: data.drinks[i].idDrink
                };
                cocktails [i] = drink;
                //console.log(cocktails[i]); //it does add them to the array
                //this is a scope issue it doesn't have access to the info

            }

            loadImages(cocktails);
          //  console.log('In the fetch',cocktails[0].drinkName); //it does not know how to print as string cant use +
            //return cocktails;
           // console.log(cocktails[1]); //figure out what this is actually doing and what you are returning
        })
        .catch(error => {
            console.error('Error:', error);
        });
    //console.log(cocktails);


}

// Function to create and append the list items
function loadImages(imageArray) {
    // Get the list element from the HTML.
    const list = document.getElementById('imageList');

    // Loop through each image in the array.
    imageArray.forEach((image, index) => {
        // Create a new list item for each image.
        const listItem = document.createElement('li');
        // Set a key attribute for the list item using the image title, converted to lowercase.
        listItem.setAttribute('key', image.drinkName);

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
        title.textContent = image.title;

        // Append the img element to the imageDiv.
        imageDiv.appendChild(img);
        // Append the imageDiv and title to the listItem.
        listItem.appendChild(imageDiv);
        listItem.appendChild(title);

        // Append the listItem to the list.
        list.appendChild(listItem);
    });
}