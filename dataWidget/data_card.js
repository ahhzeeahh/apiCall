
let datahubAtag = document.querySelector("#datahubAtag")
let sel = document.querySelector("#optionSel")
let sliderUrl = "https://api.tnris.org/api/v1/collections_catalog?limit=5&offset=0&ordering=-acquisition_date";
var slider = document.querySelector("#js-img-insert");
//var indicate = document.querySelector("#indicate");

function getCarousel() {
fetch(sliderUrl)
.then((response) => {
    if(response.ok == true){        
          return response.json()  
    }else{
        console.warning(response.status)
    }
     
})

.then((data) => {
  let num = 0
  let d = data.results
  function getSlider() {
    
    slider.innerHTML = "";
  /*  d.forEach(i =>{
      console.log(i.value)
      let btn = document.createElement("button");
     btn.innerHTML = `
 
    type="button" data-bs-target="#dataslider" data-bs-slide-to="${num}" class="" aria-current="true" aria-label="Slide ${num}"
  
   indicate.appendChild(btn);
      num++
    }); `
     
    indicate.firstElementChild.classList.add('active')*/


    d.forEach(e => {
      
      let dataCol = document.createElement("div");
      dataCol.className = "carousel-item"
      dataCol.innerHTML = `
      <a  href="https://data.geographic.texas.gov/collection/?c=${e.collection_id}" target= "_blank">
        <img class="d-block w-100" src="${e.thumbnail_image}">
        <div class="carousel-caption d-none d-md-block banner-bg">
            <h5>${e.name}</h5>
            <p>${e.acquisition_date.slice(0,4)}</p>
          </div>
      </a>
      `;
      slider.appendChild(dataCol);
      });
    
    slider.firstElementChild.classList.add('active')

  }
 getSlider();// initial call to api off pg load

})//end of .then

.catch(error => {
  console.log(error)
})
}//end of api Call fuction

getCarousel();// initial call to api off pg load



sel.addEventListener('change', () => {
  sliderUrl = "https://api.tnris.org/api/v1/collections_catalog?limit=5&offset=0&ordering=" + sel.value;
  datahubAtag.setAttribute("href", sliderUrl)
  getCarousel()
  })//end of event listner
  

  /*-----------------------------------*/
    let input = "clowns"
    let search = "https://data.geographic.texas.gov/?s=" + input + "&pg=1"
    let submit = document.querySelector("#startSearch")
function getSearch() {
  fetch(search)
  .then((response) => {
      if(response.ok == true){        
            return response.json()  
      }else{
          console.warning(response.status)
      }
       
  })
  
  .then((data) => {


    
      datahubAtag.setAttribute("href", sliderUrl)

  
  
  })//end of .then
  
  .catch(error => {
    console.log(error)
  })
  }//end of api Call fuction
  
  submit.addEventListener('submit',  getSearch);
