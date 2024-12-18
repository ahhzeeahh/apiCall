
let sel = document.querySelector("#optionSel")
let url = "https://api.tnris.org/api/v1/collections_catalog?limit=5&offset=0&ordering=" + sel.value;
console.log(url)
sel.addEventListener('change', function() {
  location.reload();
})

fetch(url)

.then((response) => {
    if(response.ok == true){        
          return response.json()  
    }else{
        console.warning(response.status)
    }
     
})

.then((data) => {
  let d = data.results
  var slider = document.querySelector("#js-img-insert");

 function getSlider() {
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

 getSlider();



})//end of .then

.catch(error => {
  console.log(error)
  
})







 