
let datahubAtag = document.querySelector("#datahubAtag")
let submit = document.querySelector("#startSearch")
let select = document.querySelector("#optionSel")
let statusMessage = document.querySelector(".alert-danger");
let statusImage = document.querySelector("#statusImg")
let sliderUrl = "https://api.tnris.org/api/v1/collections_catalog?limit=5&offset=0&ordering=-acquisition_date";
var slider = document.querySelector("#js-img-insert");
var indicate = document.querySelector("#indicate");

//---- Main fuctions below---------

setInterval(() => {
let stat = document.querySelector('li .active')
  if (stat != null) {
    let number = parseFloat(stat.getAttribute("data-bs-slide-to"))
    document.querySelector("#resultsStart").textContent = number + 1

  } else {
    document.querySelector("#resultsStart").textContent = "0"
  }
}, 1000);//check for slide # its on 


function getError() {
  //clears data objects each set
  slider.innerHTML = "";
  indicate.innerHTML = "";
  console.log("get error() fyction called from...")

    statusImage.setAttribute("src", "error.jpg")
    statusMessage.textContent = "Error Fetching Data :("
}

function getResponse() {
fetch(sliderUrl)
.then((response) => {
    if(response.ok == true){        
          console.log("im working 1")
          return response.json() 
           
    }else{
      console.log("im not WORKING")
        getError()
        console.log(response.status + " -> PART 1---this is fetch status and response = " + response.ok)
    }
     
})

.then((data) => {
  
  // Diciphering the data
  let d = data.results  
  let num = 0
  document.querySelector("#resultsCount").textContent = data.count + " results"

    //clears data objects each set
    statusImage.setAttribute("src", "loading200px200px.gif")
    statusMessage.innerHTML = ""
    slider.innerHTML = "";
    indicate.innerHTML = "";

  function getSlider() {
      console.log("INSIDE FUNCTim working 2 passed the if 0 statement")

    d.forEach(e => {
       let btn = document.createElement("li");
      let dataCol = document.createElement("div");
      btn.innerHTML = ` <button type="button" data-bs-target="#dataslider" data-bs-slide-to="${num}" class="" aria-current="true" aria-label="Slide ${num}"></button>`
      dataCol.className = "carousel-item"
      dataCol.innerHTML = `
      <a  href="https://data.geographic.texas.gov/collection/?c=${e.collection_id}" target= "_blank">
        <img height="" class="d-block w-100" src="${e.thumbnail_image}">
        <div class="carousel-caption p-3">
            <h5>${e.name}</h5>
            <p>${e.acquisition_date.slice(0,4)}</p>
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
    
    statusImage.setAttribute("src", "unavailable.jpg")
    statusMessage.textContent = "No results, search again!" 
    

    
  }else{
    console.log("ESLE/IF Im passed w/ flying colotrs")
 getSlider();
  }
})//end of .then

.catch(error => {

  getError()
  console.log(error + " ----------------PART 2 this is bottom of catch errr")

})
}






getResponse();// initial call to api off pg load









select.addEventListener('change', () => {
  sliderUrl = "https://api.tnris.org/api/v1/collections_catalog?limit=5&offset=0&ordering=" + select.value;
  datahubAtag.setAttribute("href", sliderUrl)
  console.log(sliderUrl)
  getResponse()
  })//end of event listner


  
submit.addEventListener('click',   (e) => {

    e.preventDefault();
    statusImage.setAttribute("src", "loading200px200px.gif")
    let input = document.querySelector("#searchBox")
    let searchUrl = "https://data.geographic.texas.gov/?s=" + input.value + "&pg=1"
    datahubAtag.setAttribute("href", searchUrl)

    sliderUrl = "https://api.tnris.org/api/v1/collections_catalog?limit=5&offset=0&ordering=-acquisition_date&search=" + input.value
    getResponse()

    console.log(input.value)
    input.value = "";



  }) // end of search listener


  
 

