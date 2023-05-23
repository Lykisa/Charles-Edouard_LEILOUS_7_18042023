export default function applianceFactory () {
  function addTagAppliance (event) {
    const localStorageAppliance = JSON.parse(window.localStorage.getItem('appliances'));
    localStorageAppliance.push(event);
    window.localStorage.setItem('appliances', JSON.stringify(localStorageAppliance));
  }

  function getAppliancesListDOM () {
    const appliancesDoublon = Array.from(document.querySelectorAll('.applianceName'));
    const appliances = [];
    appliancesDoublon.forEach((element) => {
      const appl = element.innerHTML;
      if (!appliances.includes(appl)) {
        appliances.push(appl);
      }
    });
    const list = document.getElementById('appliancesList');
    list.innerHTML = '';
    appliances.forEach((appliance) => {
      const applianceList = document.createElement('li');
      applianceList.className = 'appliancesLi';
      applianceList.innerHTML = appliance;
      list.appendChild(applianceList);
    });
  }
  return { addTagAppliance, getAppliancesListDOM };
}
