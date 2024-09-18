let url = "https://api.artic.edu/api/v1/artworks?fields=id,image_id,title,artist_title,date_display,provenance_text,is_public_domain&limit=100"

var apiImg = document.querySelector("#api-img");
var subhead = document.querySelector("#subhead");
var apiTitle = document.querySelector("#api-title");
var atag = document.querySelector("#atag");
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
    let newArr = starter.filter((artCol) => artCol.is_public_domain == true && artCol.image_id != null);

    console.log(starter)
    function changeImage() {
      let randomIndex = Math.floor(Math.random() * newArr.length);
      let post = newArr[randomIndex];
      console.log(post)
      let aSrc = "https://www.artic.edu/artworks/" + post.id + "/"
      let imgSrc =  "https://www.artic.edu/iiif/2/" + post.image_id + "/full/769,/0/default.jpg";
      
      atag.setAttribute("href", aSrc);
      apiImg.setAttribute("src", imgSrc);
      subhead.textContent = post.artist_title
      apiTitle.textContent  =  post.title
  
    }

    btn.addEventListener("click", changeImage);

  })
  .catch(error => {
    console.error('Error:', error);
  });

