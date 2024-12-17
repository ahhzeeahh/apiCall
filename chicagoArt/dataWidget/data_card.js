
let url = "https://api.tnris.org/api/v1/collections";

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
  document.querySelector("#dataImg").setAttribute("src", previewImg)
  document.querySelector("#dataCardTitle").setAttribute("src", previewImg)
  console.log(previewImg)
  
 
})

.catch(error => {
  console.warning(error)
  
})







 