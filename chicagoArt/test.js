let url = "https://api.artic.edu/api/v1/artworks?fields=id,image_id,title,artist_title,date_display,provenance_text,is_public_domain&limit=60"

var apiImg = document.querySelector("#api-img");
var subhead = document.querySelector("#subhead");
var apiTitle = document.querySelector("#api-title");
var btn = document.querySelector(".bi");
  


fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    let starter = data.data
    console.log (starter[10])

    let newArr = starter.filter((artCol) => artCol.is_public_domain == true);

    function changeImg() {

      let x = Math.floor(Math.random() * newArr.length)
      let art = newArr[x]
      let newImg = "https://www.artic.edu/iiif/2/" + art.image_id + "/full/843,/0/default.jpg"

      apiImg.setAttribute("src", newImg)

    }

    btn.addEventListener("click" , changeImg)
    
  })
  .catch(error => {
    console.error('Error:', error);
  });

//test