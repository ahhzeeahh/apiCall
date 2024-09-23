let url = "https://api.artic.edu/api/v1/artworks?fields=id,image_id,title,artist_title,date_display,provenance_text,is_public_domain&limit=60"

var apiImg = document.querySelector("#api-img");
var subhead = document.querySelector("#subhead");
var apiTitle = document.querySelector("#api-title");
var art = document.querySelector("#art");
var btn = document.querySelector(".bi-arrow-clockwise");


  


fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    let starter = data.data
    console.log(starter[10].is_public_domain)

    
    const newArr = starter.filter((artCol) => artCol.is_public_domain == true);

    console.log(newArr)

    function changeArt() {
      let x = Math.floor(Math.random() * newArr.length)
      var artCol = newArr[x];
      console.log("Random collection chosen..." + artCol)

      let imgSrc = "https://www.artic.edu/iiif/2/" + artCol.image_id + "/full/843,/0/default.jpg";
      
      apiImg.setAttribute("src", imgSrc)
      apiTitle.textContent = artCol.title
      subhead.innerText = "By: " + artCol.artist_title
    }
    
    
    btn.addEventListener("click" , changeArt)

  })
  .catch(error => {
    console.error('Error:', error);
  });

