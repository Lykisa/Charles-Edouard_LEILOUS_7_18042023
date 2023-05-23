export default function ustensilsFactory () {
  function addTagUstensil (event) {
    const localStorageUstensil = JSON.parse(window.localStorage.getItem('ustensils'));
    localStorageUstensil.push(event);
    window.localStorage.setItem('ustensils', JSON.stringify(localStorageUstensil));
  }

  function getUstensilsListDOM () {
    const ustensilsDoublon = Array.from(document.querySelectorAll('.ustensilName'));
    const ustensils = [];
    ustensilsDoublon.forEach((element) => {
      const ust = element.innerHTML;
      if (!ustensils.includes(ust)) {
        ustensils.push(ust);
      }
    });
    const list = document.getElementById('ustensilsList');
    list.innerHTML = '';
    ustensils.forEach((ustensils) => {
      const ustensilsList = document.createElement('li');
      ustensilsList.className = 'ustensilsLi';
      ustensilsList.innerHTML = ustensils;
      list.appendChild(ustensilsList);
    });
  }
  return { addTagUstensil, getUstensilsListDOM };
}
