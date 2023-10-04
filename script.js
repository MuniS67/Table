let d = document;
let form = d.forms.table;
let inpName = form.querySelector("#name");
let inpAge = form.querySelector("#age");
let bnt = form.querySelector("button");
let container = d.querySelector(".container");
let studentNumber = d.querySelector("#studentNumber");
let studentName = d.querySelector("#studentName");
let studentAge = d.querySelector("#studentAge");
let studentAction = d.querySelector("#studentAction");
let tBody = document.querySelector("tbody");

let modal = document.querySelector(".modal");
let changedTable = d.forms.changedTable;
let inpNameChange = changedTable.querySelector("#name1");
let inpAgeChange = changedTable.querySelector("#age1");
let bntChange = changedTable.querySelector("button");
let dataClose = document.querySelector("[data-close]");
let modal_h1 = modal.querySelector("h1");

let tables = [];

form.onsubmit = (e) => {
  e.preventDefault();
  if (inpName.value.length !== 0 && inpAge.value.length !== 0) {
    let table = {
      number: tables.length,
      name: inpName.value,
      age: new Date().getFullYear() - inpAge.value,
    };
    tables.push(table);
    reload(tables);
    form.reset();
    inpAge.classList.remove("errorInp");
    inpName.classList.remove("errorInp");
    inpName.previousElementSibling.classList.remove("errorLabel");
    inpAge.previousElementSibling.classList.remove("errorLabel");
  } else {
    inpAge.classList.add("errorInp");
    inpName.classList.add("errorInp");
    inpName.previousElementSibling.classList.add("errorLabel");
    inpAge.previousElementSibling.classList.add("errorLabel");
  }
};

function reload(arr) {
  tBody.innerHTML = "";
  for (let i of arr) {
    let trBody = d.createElement("tr");
    let number = d.createElement("td");
    let name = d.createElement("td");
    let age = d.createElement("td");
    let studentActionBody = d.createElement("td");
    let img1 = d.createElement("img");
    let img2 = d.createElement("img");

    img1.classList.add("img");
    img2.classList.add("img");

    img1.setAttribute("src", "./img/change.png");
    img2.setAttribute("src", "./img/trush.png");

    number.innerHTML = i.number;
    name.innerHTML = i.name;
    age.innerHTML = i.age;

    studentActionBody.append(img1, img2);
    tBody.append(trBody);
    trBody.append(number, name, age, studentActionBody);

    img2.onclick = () => {
      tables.splice(tables.indexOf(i, 1));
      trBody.remove();
    };

    img1.onclick = () => {
      modal.classList.add("active");

      inpNameChange.value = i.name;
      inpAgeChange.value = i.age;
      modal_h1.innerHTML = `ИЗМЕНЕНИЕ ДАННЫХ СТУДЕНТА: ${i.name}`;

      changedTable.onsubmit = (e) => {
        e.preventDefault();

        i.name = inpNameChange.value;
        name.innerHTML = inpNameChange.value;
        i.age = new Date().getFullYear() - inpAgeChange.value;
        age.innerHTML = new Date().getFullYear() - inpAgeChange.value;

        modal.classList.remove("active");
        changedTable.reset();
      };

      dataClose.onclick = () => {
        modal.classList.remove("active");
      };
    };
  }
}
