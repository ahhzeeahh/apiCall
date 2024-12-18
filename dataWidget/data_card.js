
let url = "https://api.tnris.org/api/v1/collections_catalog?limit=5";

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
  let previewImg = d[0].thumbnail_image 
  let slider = document.querySelector("#js-img-insert");

  

  d.forEach(e => {
    
    let dataCol = document.createElement("div");
    let dataImg = document.createElement("img");
    let dataLink = document.createElement("a");
     dataCol.className = "carousel-item"
     dataImg.className = "d-block w-100"
    dataImg.setAttribute("src", e.thumbnail_image);
    dataLink.setAttribute("href", "https://data.geographic.texas.gov/collection/?c=" +e.collection_id);
    
    dataLink.appendChild(dataImg); dataCol.appendChild(dataImg); slider.appendChild(dataCol);
  });
  
  slider.firstElementChild.classList.add('active')
 
})

.catch(error => {
  console.log(error)
  
})







 