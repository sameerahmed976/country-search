const form = document.querySelector(".form");
const formSearch = document.querySelector(".form-search");
const container = document.querySelector(".container");
const loading = document.querySelector(".loading");
const errorContainer = document.querySelector(".error-container");

function endPoint(name) {
  return `https://restcountries.com/v3.1/name/${name}?fullText=true`;
}

const getCountry = async (input) => {
  try {
    const response = await fetch(endPoint(input));
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    // container.innerHTML = `<h1  class="error">Please enter valid name</h1>`;
    // console.log(error);
  }
};

// const data = await getCountry("india");
// console.log(
//   "🚀 ~ file: script.js ~ line 21 ~  getCountry('india')",
//   getCountry("india"),
//   data
// );

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  container.innerHTML = "";
  errorContainer.innerHTML = ``;
  loading.classList.add("show-loading");

  const countryData = await getCountry(formSearch.value);
  formSearch.value = "";

  if (!Array.isArray(countryData)) {
    loading.classList.remove("show-loading");
    errorContainer.innerHTML = `<h1  class="error">Please enter valid name</h1>`;
    return;
  }

  //   console.log("click");
  //   console.log(typeof formSearch.value);
  //   const countryData = await getCountry(formSearch.value);
  //   console.log(countryData);

  // const countryData = await getCountry(formSearch.value);
  // console.log(
  //   "🚀 ~ file: script.js ~ line 26 ~ form.addEventListener ~ countryData",
  //   countryData
  // );

  container.innerHTML = countryData.map((data) => {
    return `<img src=${data.flags.svg} alt="image" class="image" />
        <hr />
        <h1 class="name">Name :  ${data.name.common} </h1>
        <h2 class="name-official">Official Name :  ${data.name.official} </h2>
        <h2 class="capital">capital :  ${data.capital} </h2>
        <h2 class="region">region :  ${data.region} </h2>
        <h2 class="area">area :  ${data.area} square kilometres</h2>
        <h2 class="population">population :  ${(
          Number(data.population) / 1e7
        ).toFixed(2)} crores</h2>
        <h2 class="continent">continent :  ${data.continents}</h2>
        <h2 class="timezones">timezones :  ${data.timezones}</h2>`;
  });
  loading.classList.remove("show-loading");
});
