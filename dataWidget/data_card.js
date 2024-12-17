
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
  document.querySelector("#dataImg").setAttribute("src", previewImg)
  document.querySelector("#dataCardTitle").setAttribute("src", previewImg)
  console.log(previewImg)

  d.forEach(e => {
    
    let dataCol = document.createElement("div");
    dataCol.classList("carousel-item")
    let dataImg = document.createElement("img");

    e.thumbnail_image.setAttribute("src", dataImg);
    dataImg.classList("d-block w-100")



    slider.appendChild(dataCol);
  });
  
 
})

.catch(error => {
  console.warning(error)
  
})







 