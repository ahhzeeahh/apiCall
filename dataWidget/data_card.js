
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
console.log(data.count)
  
    
  let num = 0
  document.querySelector("#resultsCount").textContent = data.count + " results"
  let d = data.results
  function getSlider() {
    if (data.count == 0) {
    console.log('im in if statement rn')
    document.querySelector(".loading").style.backgroundImage = "url ('https://cdn.dribbble.com/userupload/2905383/file/original-4ea237e94e803ddd575a66eb32198899.png?resize=400x0')"
  
  } else{
    slider.innerHTML = "";
     d.forEach(i =>{
      let btn = document.createElement("a");
     btn.innerHTML = `
 
    <button type="button" data-bs-target="#dataslider" data-bs-slide-to="${num}" class="" aria-current="true" aria-label="Slide ${num}"></button>`
  
   indicate.appendChild(btn);
      num++
      document.querySelector("#resultsStart").textContent = num
    }); 
     
    indicate.firstElementChild.classList.add('active')


    d.forEach(e => {
      
      let dataCol = document.createElement("div");
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
      });
    
    slider.firstElementChild.classList.add('active')
  }

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



