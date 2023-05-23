export default function ingredientFactory () {
  function addTagIngredient (event) {
    const localStorageIngredient = JSON.parse(window.localStorage.getItem('ingredients'));
    localStorageIngredient.push(event);
    window.localStorage.setItem('ingredients', JSON.stringify(localStorageIngredient));
  }

  function getIngredientsListDOM () {
    const ingredientsDoublon = Array.from(document.querySelectorAll('.ingredientName'));
    const ingredients = [];
    ingredientsDoublon.forEach((element) => {
      const ing = element.innerHTML;
      if (!ingredients.includes(ing)) {
        ingredients.push(ing);
      }
    });
    const list = document.getElementById('ingredientsList');
    list.innerHTML = '';
    ingredients.forEach((ingredient) => {
      const ingredientList = document.createElement('li');
      ingredientList.className = 'ingredientsLi';
      ingredientList.innerHTML = ingredient;
      list.appendChild(ingredientList);
    });
  }
  return { addTagIngredient, getIngredientsListDOM };
}
