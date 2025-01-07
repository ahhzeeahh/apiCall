
let datahubAtag = document.querySelector("#datahubAtag")
let submit = document.querySelector("#startSearch")
let select = document.querySelector("#optionSel")
let sliderUrl = "https://api.tnris.org/api/v1/collections_catalog?limit=5&offset=0&ordering=-acquisition_date";
var slider = document.querySelector("#js-img-insert");
var indicate = document.querySelector("#indicate");



function getCarousel() {
fetch(sliderUrl)
.then((response) => {
    if(response.ok == true){        
    
          return response.json() 
           
    }else{
        console.log(response.status)
    }
     
})

.then((data) => {
  
  let d = data.results  
  let num = 0
  document.querySelector("#resultsCount").textContent = data.count + " results"
  
  function getSlider() {
    
    //clears data objects each set
    slider.innerHTML = "";
    indicate.innerHTML = "";

    d.forEach(e => {
       let btn = document.createElement("li");
      let dataCol = document.createElement("div");
      btn.innerHTML = ` <button type="button" data-bs-target="#dataslider" data-bs-slide-to="${num}" class="" aria-current="true" aria-label="Slide ${num}"></button>`
      dataCol.className = "carousel-item"
      dataCol.innerHTML = `
      <a  href="https://data.geographic.texas.gov/collection/?c=${e.collection_id}" target= "_blank">
        <img class="d-block w-100" src="${e.thumbnail_image}">
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
    
    slider.firstElementChild.classList.add('active')
    indicate.firstElementChild.classList.add('active')

  }

  

 getSlider();// initial call to api off pg load

})//end of .then

.catch(error => {
  console.log(error)
})
}//end of api Call fuction

getCarousel();// initial call to api off pg load









select.addEventListener('change', () => {
  sliderUrl = "https://api.tnris.org/api/v1/collections_catalog?limit=5&offset=0&ordering=" + select.value;
  datahubAtag.setAttribute("href", sliderUrl)
  console.log(sliderUrl)
  getCarousel()
  })//end of event listner


  
submit.addEventListener('click',   (e) => {

    e.preventDefault();

    let input = document.querySelector("#searchBox")
    let searchUrl = "https://data.geographic.texas.gov/?s=" + input.value + "&pg=1"
    datahubAtag.setAttribute("href", searchUrl)

    sliderUrl = "https://api.tnris.org/api/v1/collections_catalog?limit=5&offset=0&ordering=-acquisition_date&search=" + input.value
    getCarousel()

    console.log(sliderUrl)
    input.value = "";



  }) // end of search listener

slider.addEventListener('afterchange', () => {
  document.querySelector("#resultsStart").textContent = document.querySelector('li .active').getAttribute("data-bs-slide-to")

  console.log('hi')


})//end of event listner