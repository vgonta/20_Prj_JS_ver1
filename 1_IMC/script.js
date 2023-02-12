const BMIData = [
  { name: "Maigreur", color: "midnightblue", range: [0, 18.5] },
  { name: "Bonne santé", color: "green", range: [18.5, 25] },
  { name: "Surpoids", color: "lightcoral", range: [25, 30] },
  { name: "Obésité modérée", color: "orange", range: [30, 35] },
  { name: "Obésité sévère", color: "crimson", range: [35, 40] },
  { name: "Obésité morbide", color: "purple", range: 40 },
];

// IMC = poids en kg / taille² en m

const form = document.querySelector("form");

console.log(typeof form);
console.dir(form);

form.addEventListener("submit", handleFormSubmit);

function handleFormSubmit(event) {
  event.preventDefault();

  calculateBMI();
}

/* function addEvent(event, callback) {
  const eventObject = {
    x: 59,
    y: 60
  }

  if (event.isTrigger) {
    callback(eventObject);
  }
} */

const inputs = document.querySelectorAll("input");
console.log(inputs);

function calculateBMI() {
  const height = inputs[0].value;
  const weight = inputs[1].value;

  console.log(height, weight);

  if(!height || !weight || height <= 0 || weight <= 0) {
    handleError();
    return;
  }

  const BMI = (weight / Math.pow(height / 100, 2)).toFixed(1)
  console.log(BMI);
  showResult(BMI);
}

/* toFixed(1) - combien des chifres garder après la virgule, ici 1 */

const displayBMI = document.querySelector(".bmi-value");
const result = document.querySelector(".result")

function handleError() {
  displayBMI.textContent = "Error, wrong height or weight";
  displayBMI.style.color = "inherit";
  result.textContent = "Remplissez correctement les donnes svp";
}

function showResult(BMI) {
  const rank = BMIData.find(data => {
    if(BMI >= data.range[0] && BMI < data.range[1]) return data;
    else if(typeof data.range === "number" && BMI >= data.range) return data;
  })

  console.log(rank);

  displayBMI.textContent = BMI;
  displayBMI.style.color = `${rank.color}`;
  result.textContent = `Résultat: ${rank.name}`;
}