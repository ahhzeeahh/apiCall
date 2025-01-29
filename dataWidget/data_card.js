function getFoo() {
  let word = "foo"
  return word
}

function printFooBar() {
  let word = getFoo() + "bar"
  console.log(word)
}





let datahubAtag = document.querySelector("#datahubAtag")
let submit = document.querySelector("#startSearch")
let select = document.querySelector("#optionSel")
let statusMessage = document.querySelector("#alert");
let statusImage = document.querySelector("#statusImg")
let statusTxt = document.querySelector("#statusTxt")
let sliderUrl = "https://api.tnris.org/api/v1/collections_catalog?limit=5&offset=0&ordering=-acquisition_date";
var slider = document.querySelector("#js-img-insert");
var indicate = document.querySelector("#indicate");

//---- Main fuctions below---------
/*
setInterval(() => {
let stat = document.querySelector('li .active')
  if (stat != null) {
    let number = parseFloat(stat.getAttribute("data-bs-slide-to"))
    document.querySelector("#resultsStart").textContent = number + 1

  } else {
    document.querySelector("#resultsStart").textContent = "0"
  }
}, 1000);//check for slide # its on 

*/

// GENERAL TODO:
// TODO: remove console.log statements, or comment them out
// TODO: install the Prettier plugin for vscode, as well as eslint to get autoformatting in your editor
//

function setDisplayLoading() { //TODO: consider renaming to something more specific to display. ex: 'setDisplayLoading'

  submit.disabled = true
  select.disabled = true
  document.querySelector("#dataslider").style.display = "none";

  //shows that its thinking
  statusMessage.textContent = "loading, please wait...";
  statusTxt.textContent = "Loading...";
  statusImage.setAttribute("src", "loading.gif")
}

function getSearch(e) { // TODO: consider refactoring so that display changes and search functionality are separate.

  e.preventDefault();

  // TODO: move to separate function, example, function setDataHubLink() {...}
  let input = document.querySelector("#searchBox")
  let searchUrl = "https://data.geographic.texas.gov/?s=" + input.value + "&pg=1"
  datahubAtag.setAttribute("href", searchUrl)

  sliderUrl = "https://api.tnris.org/api/v1/collections_catalog?limit=5&offset=0&ordering=-acquisition_date&search=" + input.value
  getResponse()

}

function getError(length) { // TODO: consider renaming to be more accurate and specific. Example "setDisplayError"

  if (length === 0) {
    console.log("INSIDE getError()... fuction called from api has 0 querries")

    statusImage.setAttribute("src", "Empty_icon.png")
    statusMessage.textContent = "No results";
    statusTxt.textContent = "No data found";

  } else {
    console.log("INSIDE getError()...")
    statusImage.setAttribute("src", "Error_icon.png")
    statusTxt.textContent = "Error: Please Try Another Query";
    statusMessage.textContent = "Error";
  }

  submit.disabled = false
    select.disabled = false
}

submit.addEventListener('click', getSearch);

document.querySelector(".bi-search").addEventListener('click', setDisplayLoading);

select.addEventListener('change', () => { // TODO: refactor this anonymous function to a named function
  sliderUrl = "https://api.tnris.org/api/v1/collections_catalog?limit=5&offset=0&ordering=" + select.value;
  datahubAtag.setAttribute("href", sliderUrl) // TODO: this likely causes a bug / is unintentional. you are setting the datahub link to the api url here
  getResponse()
})//end of event listner // TODO: remove preceding comment and all comments which do not provide documentary value (comments should explain things that are not obvious or require explanation)



function getResponse() { // TODO: consider renaming function. "getSearch" may make more sense here, once refactored.

  setDisplayLoading();

  fetch(sliderUrl)
    .then((response) => {
      if (response.ok == true) {
        console.log("im working 1")
        return response.json()

      } else {
        console.log("im not WORKING 1") // TODO: remove console.log

        getError()
        console.log(response.status + " -> PART 1---this is fetch status and response = " + response.ok) // TODO: remove console.log
      }

    })

    .then((data) => {

      slider.innerHTML = "";
      indicate.innerHTML = "";

      let d = data.results // TODO: consider renaming to "collections"
      let num = 0; // TODO: not necessary. simple

      // TODO: refactor getSlider function to exist outside of the scope of getResponse and take an argument 
      // TODO: rename getSlider to something more accurate and specific. Ex: "setCarouselSlides" or similar.
      // TODO: refactor so that setting slider innerHTML and indicator innerHTML occurs inside of getSlider
      function getSlider() {
        console.log("2 INSIDE FUNCTim working 2 passed the if 0 statement") // TODO: remove console.log

        // TODO: consider creating a named function like "generateSlideHTML" in place of the anonymous function below, which takes args "collection" and "index"
        // TODO: consider using the second argument of the callback function for "forEach", which gives access to the index
        // of the current element in the array. This will allow you to get rid of the "num" variable above
        d.forEach(e => {
          let btn = document.createElement("li");
          let dataCol = document.createElement("div");
          btn.innerHTML = ` <button type="button" data-bs-target="#dataslider" data-bs-slide-to="${num}" class="" aria-current="true" aria-label="Slide ${num}"></button>`
          dataCol.className = "carousel-item"
          dataCol.innerHTML = `
        <img class="d-block w-100" src="${e.thumbnail_image}">
        <div class="carousel-caption p-3">
        <a  href="https://data.geographic.texas.gov/collection/?c=${e.collection_id}" target= "_blank">
          <h5 class="">${e.name}</h5>
        </a>
            <p class="bold">${e.acquisition_date.slice(0, 4)}</p>
          </div>
      </a>
      `;
          slider.appendChild(dataCol);
          indicate.appendChild(btn);
          num++
        });

        slider.firstElementChild.classList.add('active');
        indicate.firstElementChild.classList.add('active')



      }

      if (d.length == 0) {
        //---Search came back with nothing from API ...ex "clowns"-------   
        d.length = length
        getError(length)



      } else {
        statusMessage.textContent = "showing 5 of " + data.count + " results";
        console.log("3 ESLE/IF Im passed w/ flying colotrs")
        getSlider();
        

      }


      submit.disabled = false
    select.disabled = false
    document.querySelector("#dataslider").style.display = "block";

    })//end of .then

    .catch(error => {

      getError()
      console.log(error + " ----------------PART 2 this is bottom of catch errr")

    })
}

// TODO: consider creating an "init" function where all necessary initialization functions are called. In this case, just "getResponse" would be called
// but if, in the future, you needed to extend initialization functionality, you could simply create a new function and call it in "init"
getResponse();// initial call to api off pg load
