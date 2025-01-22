
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

function load() {  
  
  submit.disabled = true
  select.disabled = true
  
  //clears data objects each set
   slider.innerHTML = "";
    indicate.innerHTML = "";

  //shows that its thinking
  statusMessage.textContent = "loading, please wait...";
  statusTxt.textContent = "Loading...";
  statusImage.setAttribute("src", "loading.gif")

   

    setInterval(() => {
    submit.disabled = false
    select.disabled = false
    }, 1000);
    

}

function getSearch(e) {

  e.preventDefault();
  let input = document.querySelector("#searchBox")
  let searchUrl = "https://data.geographic.texas.gov/?s=" + input.value + "&pg=1"
  datahubAtag.setAttribute("href", searchUrl)

  sliderUrl = "https://api.tnris.org/api/v1/collections_catalog?limit=5&offset=0&ordering=-acquisition_date&search=" + input.value
  getResponse()
  
}

function getError() {
  
  console.log("get error() fyction called from...")

    statusImage.setAttribute("src", "Error_icon.png")
    statusTxt.textContent = "Error: Please Try Another Query";
    statusMessage.textContent = "Error";

}

function getResponse() {
fetch(sliderUrl)
.then((response) => {
    if(response.ok == true){        
          console.log("im working 1")
          return response.json() 
           
    }else{
      console.log("im not WORKING")
        load()
        getError()
        console.log(response.status + " -> PART 1---this is fetch status and response = " + response.ok)
    }
     
})

.then((data) => {
  
  // Diciphering the data
  let d = data.results  
  let num = 0

  load()

  function getSlider() {
      console.log("INSIDE FUNCTim working 2 passed the if 0 statement")

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
            <p class="bold">${e.acquisition_date.slice(0,4)}</p>
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

    statusImage.setAttribute("src", "Empty_icon.png")
    statusMessage.textContent = "No results";
    statusTxt.textContent = "No data found";
    

    
  }else{
     statusMessage.textContent = "showing 5 of " + data.count + " results";
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


submit.addEventListener('click',  getSearch);
document.querySelector(".bi-search").addEventListener('click', load);
select.addEventListener('change', () => {
  sliderUrl = "https://api.tnris.org/api/v1/collections_catalog?limit=5&offset=0&ordering=" + select.value;
  datahubAtag.setAttribute("href", sliderUrl)
  console.log(sliderUrl)
  getResponse()
  })//end of event listner


  


  
 

