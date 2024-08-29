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
                cocktails.push(drink);
                //console.log(cocktails[i]); //it does add them to the array
            }
            //const drinks = JSON.parse(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    /*This fethes the entire list figure out how to parse it and send each to html elements*/
    for (let i = 0; i < cocktails.length; i++) console.log(cocktails[i]);
    const para = document.createElement("p");
    const node = document.createTextNode("Something");
    para.appendChild(node);

}
