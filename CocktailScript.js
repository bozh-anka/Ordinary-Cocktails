/*Get json from api and filter through it with functions
* have a function generate the image + name preview n click redirect to new page and fetch details
*
* */


window.onload=function(){

    apiTalk();
    //let test = drinks.find(drinks => drinks.drinkId === '15300')
    //console.log('outside',test);
    //document.write(drinks);
    //for (let i = 0; i < drinks.length; i++){ console.log(drinks[i].drinkName)}

    /*const element = document.createElement('div');
    element.id = 'drink';
    element.innerTex = 'test';
    document.body.appendChild(element);*/
}
function apiTalk(){
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
            console.log('In the fetch',cocktails[0].drinkName); //it does not know how to print as string cant use +
            //return cocktails;
           // console.log(cocktails[1]); //figure out what this is actually doing and what you are returning
        })
        .catch(error => {
            console.error('Error:', error);
        });
    console.log(cocktails);
    /*This fetches the entire list figure out how to parse it and send each to html elements*/
    return cocktails;
}
