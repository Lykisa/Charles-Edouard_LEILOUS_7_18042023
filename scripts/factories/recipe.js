/* eslint-disable no-unused-vars */
export default function recipeFactory (data) {
  const { id, name, servings, ingredients, time, description, appliance, ustensils } = data;

  function getRecipeCardDOM () {
    const article = document.createElement('article');

    const recipeHeader = document.createElement('div');
    recipeHeader.className = 'recipeHeader';

    const h2 = document.createElement('h2');
    h2.textContent = name;

    recipeHeader.appendChild(h2);

    const recipeTimeDiv = document.createElement('div');
    recipeTimeDiv.className = 'recipeTimeDiv';

    const timeIconRecipe = document.createElement('i');
    timeIconRecipe.className = 'fa-regular fa-clock';

    const timeRecipe = document.createElement('p');
    timeRecipe.textContent = time + ' ' + 'min';

    recipeTimeDiv.appendChild(timeIconRecipe);
    recipeTimeDiv.appendChild(timeRecipe);
    recipeHeader.appendChild(recipeTimeDiv);

    const recipeInfos = document.createElement('div');
    recipeInfos.className = 'recipeInfos';

    const recipeContent = document.createElement('div');
    recipeContent.className = 'recipeContent';
    console.log(recipeInfos);

    const recipeDescription = document.createElement('p');
    recipeDescription.textContent = description;
    recipeContent.appendChild(recipeDescription);

    recipeInfos.appendChild(recipeContent);
    article.appendChild(recipeHeader);
    article.appendChild(recipeInfos);

    return (article);
  }

  function getIngredientsCardDOM () {
    const ingredientInfos = document.createElement('div');
    ingredientInfos.className = 'ingredientInfos';
    ingredients.forEach((ingredient) => {
      const p = document.createElement('p');
      /*  if ternaire >> a regarder en detail */
      const quantity = (ingredient.quantity !== undefined) ? ingredient.quantity : '';
      const unit = (ingredient.unit !== undefined) ? ingredient.unit : '';
      p.innerHTML = `<span class = 'ingredientName'>${ingredient.ingredient}</span> ${quantity} ${unit}`;
      ingredientInfos.appendChild(p);
    });
    return ingredientInfos;
  }

  return { name, getRecipeCardDOM, getIngredientsCardDOM };
}
