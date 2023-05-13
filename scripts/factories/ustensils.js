export default function ustensilsFactory () {
  const ustensilsDoublon = Array.from(document.querySelectorAll('.ustensilName'));
  const ustensils = [];
  ustensilsDoublon.forEach((element) => {
    const ust = element.innerHTML;
    if (!ustensils.includes(ust)) {
      ustensils.push(ust);
    }
  });

  function getUstensilsListDOM () {
    const list = document.getElementById('ustensilsList');
    ustensils.forEach((ustensils) => {
      const ustensilsList = document.createElement('li');
      ustensilsList.className = 'ustensilsLi';
      ustensilsList.innerHTML = ustensils;
      list.appendChild(ustensilsList);
    });
  }
  return { getUstensilsListDOM };
}
