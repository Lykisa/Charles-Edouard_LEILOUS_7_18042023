export default function applianceFactory () {
  const appliancesDoublon = Array.from(document.querySelectorAll('.applianceName'));
  const appliances = [];
  appliancesDoublon.forEach((element) => {
    const appl = element.innerHTML;
    if (!appliances.includes(appl)) {
      appliances.push(appl);
    }
  });

  function getAppliancesListDOM () {
    const list = document.getElementById('appliancesList');
    /* applianceList.innerHTML = appliances; */
    appliances.forEach((appliance) => {
      const applianceList = document.createElement('li');
      applianceList.className = 'appliancesLi';
      applianceList.innerHTML = appliance;
      list.appendChild(applianceList);
    });
  }
  return { getAppliancesListDOM };
}
