let url = "https://api.artic.edu/api/v1/artworks?fields=id,image_id,title,artist_title,date_display,provenance_text,is_public_domain&limit=60"

var apiImg = document.querySelector("#api-img");
var subhead = document.querySelector("#subhead");
var apiTitle = document.querySelector("#api-title");
var art = document.querySelector("#art");
  


fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    let starter = data.data
    console.log (starter[10].is_public_domain)

    const newArr = starter.filter((artCol) => artCol.is_public_domain == true);

    let numb = Math.floor(Math.random() * newArr.length)
    console.log(numb)

  })
  .catch(error => {
    console.error('Error:', error);
  });

//test