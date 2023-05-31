import recipeFactory from '../factories/recipe.js';
import ingredientFactory from '../factories/ingredient.js';
import applianceFactory from '../factories/appliance.js';
import ustensilsFactory from '../factories/ustensils.js';
const json = '../data/recipes.json';
window.localStorage.setItem('ingredients', JSON.stringify([]));
window.localStorage.setItem('appliances', JSON.stringify([]));
window.localStorage.setItem('ustensils', JSON.stringify([]));

async function getRecipes () {
  const recipes = await fetch(json)
    .then((resp) => resp.json())
    .then((json) => json.recipes);

  return ({ recipes });
}

async function displayData (recipes) {
  const recipesSection = document.getElementById('recipesSection');
  recipesSection.innerHTML = '';

  recipes.forEach((recipe) => {
    const recipeModel = recipeFactory(recipe);
    const recipeCardDOM = recipeModel.getRecipeCardDOM();
    const recipeIngredientsCardDOM = recipeModel.getIngredientsCardDOM();
    const recipeAppliancesCardDOM = recipeModel.getAppliancesCardDOM();
    const recipeUstensilsCardDOM = recipeModel.getUstensilsCardDOM();
    recipesSection.appendChild(recipeCardDOM);
    recipeCardDOM.appendChild(recipeIngredientsCardDOM);
    recipeCardDOM.appendChild(recipeAppliancesCardDOM);
    recipeCardDOM.appendChild(recipeUstensilsCardDOM);
  });

  const ingredientModel = ingredientFactory();
  const applianceModel = applianceFactory();
  const ustensilModel = ustensilsFactory();
  ingredientModel.getIngredientsListDOM();
  applianceModel.getAppliancesListDOM();
  ustensilModel.getUstensilsListDOM();

  const ingredientsElement = document.querySelectorAll('.ingredientsLi');
  ingredientsElement.forEach((element) => {
    /* fonction crée dans la factory */
    element.addEventListener('click', (e) => {
      ingredientModel.addTagIngredient(element.innerHTML);
      /* fonction de la recherche appelée */
      renderTags();
      launchSearch();
    });
  });
  const appliancesElement = document.querySelectorAll('.appliancesLi');
  appliancesElement.forEach((element) => {
    element.addEventListener('click', (e) => {
      applianceModel.addTagAppliance(element.innerHTML);
      renderTags();
      launchSearch();
    });
  });
  const ustensilsElement = document.querySelectorAll('.ustensilsLi');
  ustensilsElement.forEach((element) => {
    element.addEventListener('click', (e) => {
      ustensilModel.addTagUstensil(element.innerHTML);
      renderTags();
      launchSearch();
    });
  });
}

/* Fonction de recherche */

async function launchSearch () {
  const localStorageIngredient = JSON.parse(window.localStorage.getItem('ingredients'));
  const localStorageAppliance = JSON.parse(window.localStorage.getItem('appliances'));
  const localStorageUstensil = JSON.parse(window.localStorage.getItem('ustensils'));
  const searchInput = document.getElementById('researchBarInput').value;
  const { recipes } = await getRecipes();
  const result = [];

  recipes.forEach((element) => {
    const ingredientsRecipe = element.ingredients;
    const ingredients = [];
    ingredientsRecipe.forEach(ing => {
      ingredients.push(ing.ingredient);
    });

    const ustensilsRecipe = element.ustensils;

    const applianceRecipe = [element.appliance];

    if (localStorageIngredient.every(i => ingredients.includes(i)) &&
        localStorageUstensil.every(u => ustensilsRecipe.includes(u)) &&
        localStorageAppliance.every(a => applianceRecipe.includes(a)) &&
        (element.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        element.description.toLowerCase().includes(searchInput.toLowerCase()) ||
        ingredients.map(i => i.toLowerCase()).includes(searchInput.toLowerCase()))) {
      result.push(element);
    }
  });
  displayData(result);
}

async function init () {
  const { recipes } = await getRecipes();
  displayData(recipes);
}

init();

/* Fonction pour les barres de recherches */

/* Fonction de la grande barre de recherche */

function getResearchBarInput () {
  const input = document.getElementById('researchBarInput');
  input.addEventListener('keyup', () => {
    launchSearch();
  });
}

getResearchBarInput();

/* Ingrédients */

function getIngredientsFilterResearchInput () {
  const input = document.getElementById('filter_ingredients');
  let inputValue = '';
  input.addEventListener('keyup', () => {
    inputValue = input.value;
    console.log(inputValue);
    const items = document.querySelectorAll('.ingredientsLi');
    items.forEach(item => {
      if (item.innerHTML.toLowerCase().includes(inputValue.toLowerCase())) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
}

getIngredientsFilterResearchInput();

/* Appliances */

function getAppliancesFilterResearchInput () {
  const input = document.getElementById('filter_appliances');
  let inputValue = '';
  input.addEventListener('keyup', () => {
    inputValue = input.value;
    console.log(inputValue);
    const items = document.querySelectorAll('.appliancesLi');
    items.forEach(item => {
      if (item.innerHTML.toLowerCase().includes(inputValue.toLowerCase())) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
}

getAppliancesFilterResearchInput();

/* Ustensils */

function getUstensilsFilterResearchInput () {
  const input = document.getElementById('filter_ustensils');
  let inputValue = '';
  input.addEventListener('keyup', () => {
    inputValue = input.value;
    console.log(inputValue);
    const items = document.querySelectorAll('.ustensilsLi');
    items.forEach(item => {
      if (item.innerHTML.toLowerCase().includes(inputValue.toLowerCase())) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
}

getUstensilsFilterResearchInput();

/* Event Listener pour les filtres et ouverture des listes */

/* Ingrédients */

const ingredientsButton = document.getElementById('ingredients_button');
const ingredientsFilter = document.getElementById('filter_ingredients');
const ingredientsUp = document.getElementById('ingredientsUp');
const ingredientsDown = document.getElementById('ingredientsDown');
const ingredientsList = document.getElementById('ingredientsList');

function displayIngredients () {
  ingredientsButton.style.width = '696px';
  ingredientsList.style.display = 'grid';
  ingredientsDown.style.display = 'none';
  ingredientsUp.style.display = 'block';
}

function displayIngredientsRegular () {
  ingredientsButton.style.width = '170px';
  ingredientsList.style.display = 'none';
  ingredientsDown.style.display = 'block';
  ingredientsUp.style.display = 'none';
}

ingredientsFilter.addEventListener('click', displayIngredients);
ingredientsDown.addEventListener('click', displayIngredients);
ingredientsUp.addEventListener('click', displayIngredientsRegular);

/* Appliances */

const appliancesButton = document.getElementById('appliances_button');
const appliancesFilter = document.getElementById('filter_appliances');
const appliancesUp = document.getElementById('appliancesUp');
const appliancesDown = document.getElementById('appliancesDown');
const appliancesList = document.getElementById('appliancesList');

function displayAppliances () {
  appliancesButton.style.width = '396px';
  appliancesList.style.display = 'grid';
  appliancesDown.style.display = 'none';
  appliancesUp.style.display = 'block';
}

function displayAppliancesRegular () {
  appliancesButton.style.width = '170px';
  appliancesList.style.display = 'none';
  appliancesDown.style.display = 'block';
  appliancesUp.style.display = 'none';
}

appliancesFilter.addEventListener('click', displayAppliances);
appliancesDown.addEventListener('click', displayAppliances);
appliancesUp.addEventListener('click', displayAppliancesRegular);

/* Ustensils */

const ustensilsButton = document.getElementById('ustensils_button');
const ustensilsFilter = document.getElementById('filter_ustensils');
const ustensilsUp = document.getElementById('ustensilsUp');
const ustensilsDown = document.getElementById('ustensilsDown');
const ustensilsList = document.getElementById('ustensilsList');

function displayUstensils () {
  ustensilsButton.style.width = '496px';
  ustensilsList.style.display = 'grid';
  ustensilsDown.style.display = 'none';
  ustensilsUp.style.display = 'block';
}

function displayUstensilsRegular () {
  ustensilsButton.style.width = '170px';
  ustensilsList.style.display = 'none';
  ustensilsDown.style.display = 'block';
  ustensilsUp.style.display = 'none';
}

ustensilsFilter.addEventListener('click', displayUstensils);
ustensilsDown.addEventListener('click', displayUstensils);
ustensilsUp.addEventListener('click', displayUstensilsRegular);

/* Fonction affichage des tags */

function closeTag (type, valeur) {
  const localStorageIngredient = JSON.parse(window.localStorage.getItem('ingredients'));
  const localStorageAppliance = JSON.parse(window.localStorage.getItem('appliances'));
  const localStorageUstensil = JSON.parse(window.localStorage.getItem('ustensils'));
  switch (type) {
    case 'ing': {
      const index = localStorageIngredient.indexOf(valeur);
      localStorageIngredient.splice(index, 1);
      window.localStorage.setItem('ingredients', JSON.stringify(localStorageIngredient));
      renderTags();
      break;
    }
    case 'app' : {
      const index = localStorageAppliance.indexOf(valeur);
      localStorageAppliance.splice(index, 1);
      window.localStorage.setItem('appliances', JSON.stringify(localStorageAppliance));
      renderTags();
      break;
    }
    case 'ust' : {
      const index = localStorageUstensil.indexOf(valeur);
      localStorageUstensil.splice(index, 1);
      window.localStorage.setItem('ustensils', JSON.stringify(localStorageUstensil));
      renderTags();
      break;
    }

    default:
      break;
  }
  launchSearch();
}
function renderTags () {
  const localStorageIngredient = JSON.parse(window.localStorage.getItem('ingredients'));
  const localStorageAppliance = JSON.parse(window.localStorage.getItem('appliances'));
  const localStorageUstensil = JSON.parse(window.localStorage.getItem('ustensils'));
  const ul = document.getElementById('tagsList');
  ul.innerHTML = '';
  localStorageIngredient.forEach((ing) => {
    const li = document.createElement('li');
    li.classList.add('ingredient');
    const span = document.createElement('span');
    span.textContent = ing;
    const i = document.createElement('i');
    i.className = 'far fa-times-circle';
    i.addEventListener('click', () => {
      closeTag('ing', ing);
    });

    ul.appendChild(li);
    li.appendChild(span);
    li.appendChild(i);
  });
  localStorageAppliance.forEach((app) => {
    const li = document.createElement('li');
    li.classList.add('appliance');
    const span = document.createElement('span');
    span.textContent = app;
    const i = document.createElement('i');
    i.className = 'far fa-times-circle';
    i.addEventListener('click', () => {
      closeTag('app', app);
    });

    ul.appendChild(li);
    li.appendChild(span);
    li.appendChild(i);
  });
  localStorageUstensil.forEach((ust) => {
    const li = document.createElement('li');
    li.classList.add('ustensil');
    const span = document.createElement('span');
    span.textContent = ust;
    const i = document.createElement('i');
    i.className = 'far fa-times-circle';
    i.addEventListener('click', () => {
      closeTag('ust', ust);
    });

    ul.appendChild(li);
    li.appendChild(span);
    li.appendChild(i);
  });
}
