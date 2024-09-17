

//API criteia embeded in url link to slow load time for mass data... over 12k+ collections though
let url = "https://api.artic.edu/api/v1/artworks?fields=id,image_id,title,artist_title,date_display,provenance_text,is_public_domain&limit=60";

var apiImg = document.querySelector("#api-img");
var subhead = document.querySelector("#subhead");
var apiTitle = document.querySelector("#api-title");
var art = document.querySelector("#art");

fetch(url)
  .then((res) => {
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.json();
  })

  .then((img) => {
  
    fetch(url).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Something went wrong on API server!");
      }
    })
    
    .then((img) => {
        let x = img.data
        let newArr = x.filter(item => item.is_public_domain == true)
        var numb = Math.floor(Math.random() * newArr.length);
   

        function changeItem() {

          apiImg.toggle() = "show"
        }


        //document.querySelector("#btn").addEventListner("click", changeItem())
    })
    
    .catch((error) => {
      console.error(error);
    });

  })
