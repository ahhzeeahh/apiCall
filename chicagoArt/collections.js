

//API criteia embeded in url link to slow load time for mass data... over 12k+ collections though
let url = "https://api.artic.edu/api/v1/artworks?fields=id,image_id,title,artist_title,date_display,provenance_text,is_public_domain&limit=40";

fetch(url)
  .then((res) => {
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.json();
  })
  .then((data) => {
    console.log(data);

    let col = data.data
    let numb = Math.floor(Math.random() * col.length)
    var apiImg = document.querySelector("#api-img");
    var subhead = document.querySelector("#subhead");
    var apiTitle = document.querySelector("#api-title");
    var art = document.querySelector("#art");


    col.filter()

    function getArt(params) {
      
    }

    function onTimer(a) {

      
    }

  })

  .catch((error) => {
    console.error("Fetch error:", error);
  });

  
