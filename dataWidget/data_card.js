let i = "index";
let datahubAtag = document.querySelector("#datahubAtag")
let submit = document.querySelector("#startSearch")
let select = document.querySelector("#optionSel")
let statusMessage = document.querySelector("#alert");
let statusImage = document.querySelector("#statusImg")
let statStart =  document.querySelector("#resultsStart")
let statusTxt = document.querySelector("#statusTxt")
let sliderUrl = "https://api.tnris.org/api/v1/collections_catalog?limit=5&offset=0&ordering=-acquisition_date";
var slider = document.querySelector("#js-img-insert");
var indicate = document.querySelector("#indicate");

//---- count what slide its on---------

setInterval(() => {
  let stat = document.querySelector('li .active')
  let currSlide = parseFloat(stat.getAttribute("data-bs-slide-to")) + 1
 statStart.textContent = "Showing " + currSlide + " of"

}, 1000);//check for slide # its on 

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
  }, 2000);
}

function setSearchLink(e) { 
  e.preventDefault();
  let input = document.querySelector("#searchBox")
  let searchUrl = "https://data.geographic.texas.gov/?s=" + input.value + "&pg=1"
  datahubAtag.setAttribute("href", searchUrl)
  sliderUrl = "https://api.tnris.org/api/v1/collections_catalog?limit=5&offset=0&ordering=-acquisition_date&search=" + input.value
getAPIResponse()

}
function setDataHubLink() {
  sliderUrl = "https://api.tnris.org/api/v1/collections_catalog?limit=5&offset=0&ordering=" + select.value;
  let searchUrl = "https://data.geographic.texas.gov/?s=" + select.value + "&pg=1"
  datahubAtag.setAttribute("href", searchUrl)
  getAPIResponse()
  
  
}

function setDisplayError(i) { 

  if (i === 0) {
    console.warn("The requestto API has 0 results")
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
  statStart.innerHTML = ""
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
      let collections = data.results 
      if (collections.length == 0) {
              //---Search came back with nothing from API ...ex "clowns"-------   
             collectionslength = i
              getError(i)

            } else {
              generateSlides();
      }
      function generateSlides() {
        // TODO: consider using the second argument of the callback function for "forEach", which gives access to the index
       collections.forEach(e => {
          //find current slide num aka num in array it is on console.log(d.indexOf(e) + 1)
          let btn = document.createElement("li");
          let dataCol = document.createElement("div");
          btn.innerHTML = ` <button type="button" data-bs-target="#dataslider" data-bs-slide-to="${collections.indexOf(e)}" class="" aria-current="" aria-label="Slide ${collections.indexOf(e)}"></button>`
          dataCol.className = "carousel-item"
          dataCol.innerHTML = `
        <img class="d-block w-100" src="${e.thumbnail_image}">
        <div class="carousel-caption p-3">
            <a  href="https://data.geographic.texas.gov/collection/?c=${e.collection_id}" target= "_blank">
              <h5 class="">${e.name}</h5>
            </a>
            <p class="bold">${e.acquisition_date.slice(0, 4)}</p>
        </div>
    
      `;
          slider.appendChild(dataCol);
          indicate.appendChild(btn);
        
        });
        //Add info to the DOM after slides are created
        slider.firstElementChild.classList.add('active');
        indicate.firstElementChild.classList.add('active')
        statusMessage.textContent = collections.length + " - " + data.count + " Total"
        statStart.textContent = "Showing 1 of"

     
      }

     
    })//end of .then

    .catch(error => {
      setDisplayError(i)
    })
}

// but if, in the future, you needed to extend initialization functionality, you could simply create a new function and call it in "init"
getAPIResponse()

submit.addEventListener('click', setSearchLink);
document.querySelector(".bi-search").addEventListener('click', setSearchLink);
select.addEventListener('change', setDataHubLink)

