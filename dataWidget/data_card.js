let i = "index";
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
function setDisplayLoading() {
  submit.disabled = true
  select.disabled = true

  //shows that its thinking
  statusMessage.textContent = "loading, please wait...";
  statusTxt.textContent = "Loading...";
  statusImage.setAttribute("src", "loading.gif")

  setTimeout(() =>{
    submit.disabled = false
    select.disabled = false
    console.log("hi")
  }, 2000);
}
function setDataHubLink(e) { 
  e.preventDefault();
  let input = document.querySelector("#searchBox")
if (input === "") {
  let searchUrl = "https://data.geographic.texas.gov/?s=" + input.value + "&pg=1"
  datahubAtag.setAttribute("href", searchUrl)
  sliderUrl = "https://api.tnris.org/api/v1/collections_catalog?limit=5&offset=0&ordering=-acquisition_date&search=" + input.value
} else {
  sliderUrl = "https://api.tnris.org/api/v1/collections_catalog?limit=5&offset=0&ordering=" + select.value;
    let searchUrl = "https://data.geographic.texas.gov/?s=" + select.value + "&pg=1"
  datahubAtag.setAttribute("href", searchUrl) 
}
getAPIResponse()

}

function setDisplayError(i) { 

  if (length === 0) {
 statusImage.setAttribute("src", "Empty_icon.png")
    statusMessage.textContent = "No results";
    statusTxt.textContent = "No data found";

  } else {
    statusImage.setAttribute("src", "Error_icon.png")
    statusTxt.textContent = "Error: Please Try Another Query";
    statusMessage.textContent = "Error";
  }
}


function getAPIResponse() { 
  slider.innerHTML = "";
  indicate.innerHTML = "";
  setDisplayLoading();

  fetch(sliderUrl)
    .then((response) => {
      if (response.ok == true) {
        return response.json()

      } else {
        setDisplayError(i)
         }

    })

    .then((data) => {
      let d = data.results // TODO: consider renaming to "collections"
      let num = 0;
      console.log(d.length)
      if (d.length == 0) {
              //---Search came back with nothing from API ...ex "clowns"-------   
              d.length = i
              getError(i)

            } else {
              getSlider();
      }

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

     
    })//end of .then

    .catch(error => {
      setDisplayError(i)
    })
}

// TODO: consider creating an "init" function where all necessary initialization functions are called. In this case, just "getResponse" would be called
// but if, in the future, you needed to extend initialization functionality, you could simply create a new function and call it in "init"
getAPIResponse()// initial call to api off pg load

submit.addEventListener('click', setDataHubLink);
document.querySelector(".bi-search").addEventListener('click', setDataHubLink);
select.addEventListener('change', setDataHubLink)

