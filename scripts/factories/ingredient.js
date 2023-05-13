export default function ingredientFactory () {
  const ingredientsDoublon = Array.from(document.querySelectorAll('.ingredientName'));
  const ingredients = [];
  ingredientsDoublon.forEach((element) => {
    const ing = element.innerHTML;
    if (!ingredients.includes(ing)) {
      ingredients.push(ing);
    }
  });

  function addTagIngredient (tag) {
    const localStorageIngredient = JSON.parse(window.localStorage.getItem('ingredients'));
    localStorageIngredient.push(tag);
    window.localStorage.setItem('ingredients', JSON.stringify(localStorageIngredient));
  }

  function getIngredientsListDOM () {
    const list = document.getElementById('ingredientsList');
    ingredients.forEach((ingredient) => {
      const ingredientList = document.createElement('li');
      ingredientList.className = 'ingredientsLi';
      ingredientList.innerHTML = ingredient;
      list.appendChild(ingredientList);
    });
  }
  return { addTagIngredient, getIngredientsListDOM };
}
