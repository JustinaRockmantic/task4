/* ------------------------------ TASK 4 -----------------------------------
Parašykite JS kodą, kuris vartotojui atėjus į tinklalapį kreipsis į cars.json failą
ir iš jo atvaizduos visus automobilių gamintojus ir pagamintus modelius. 
Kiekvienas gamintojas turės savo atvaizdavimo "kortelę", kurioje bus 
nurodomas gamintojas ir jo pagaminti modeliai.


Pastaba: Informacija apie automobilį (brand) (jo kortelė) turi turėti 
bent minimalų stilių;
-------------------------------------------------------------------------- */

// async function getCars() {
//   try {
//     let response = await fetch(`./cars.json`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (response.ok) {
//       let result = await response.json();

//       console.log(result);

//       //   let body = document.querySelector("body");

//       cardWraper = document.getElementById("output");

//       let card = document.createElement("div");
//       card.classList.add("userCard");

//       let carBrand = document.createElement("h1");
//       carBrand.textContent = result.brand;

//       let carModel = document.createElement("h3");
//       carModel.textContent = result.models;

//       card.append(carBrand, carModel);
//       // body.append(card);
//       cardWraper.append(card);
//     } else {
//       throw new Error("error occured");
//     }
//   } catch (error) {
//     let errorText = document.createElement("p");
//     errorText.textContent = "Error occured";
//     errorText.style.color = "red";
//     errorText.style.fontSize = "50px";

//     // let body = document.querySelector("body");
//     // body.append(errorText);
//     console.error(error);
//   }
// }
// getCars();

// select the output element
const output = document.getElementById("output");

// fetch the JSON data
fetch("./cars.json")
  .then((response) => response.json())
  .then((data) => {
    // group the cars by manufacturer
    const carsByBrand = data.reduce((acc, car) => {
      if (acc[car.brand]) {
        acc[car.brand].push(car.models);
      } else {
        acc[car.brand] = [car.models];
      }
      return acc;
    }, {});

    // create a card for each manufacturer
    for (const brand in carsByBrand) {
      const card = document.createElement("div");
      card.classList.add("card");
      const heading = document.createElement("h2");
      heading.textContent = brand;
      card.appendChild(heading);
      const modelsList = document.createElement("ul");
      carsByBrand[brand].forEach((models) => {
        const modelsItem = document.createElement("li");
        modelsItem.textContent = models;
        modelsList.appendChild(modelsItem);
      });
      card.appendChild(modelsList);
      output.appendChild(card);
    }
  })
  .catch((error) => console.error(error));
