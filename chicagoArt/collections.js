
let url =
  "https://api.artic.edu/api/v1/artworks?fields=id,image_id,title,artist_title,date_display,provenance_text,is_public_domain&limit=40";
let imageInterval; // To store the interval ID

fetch(url)
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Something went wrong on API server!");
    }
  })
  .then((data) => {
    const col = data.data;
    var apiImg = document.querySelector("#api-img");
    var subhead = document.querySelector("#subhead");
    var apiTitle = document.querySelector("#api-title");
    var art = document.querySelector("#art");
    var btn = document.querySelector(".bi");

    let x = col.filter((post) => post.is_public_domain && post.image_id != null);

    function changeImage() {
      let randomIndex = Math.floor(Math.random() * x.length);
      let post = x[randomIndex];

      let aSrc ="https://www.artic.edu/artworks/" + post.id
      let imgSrc =
        "https://www.artic.edu/iiif/2/" + post.image_id + "/full/843,/0/default.jpg";

      apiImg.setAttribute("src", imgSrc);
      art.setAttribute("href", aSrc);

      subhead.textContent = "By: " + post.artist_title;

      apiTitle.textContent = `"` + post.title + `"`

      console.log("Col updated.");
    }

    btn.addEventListener("click", changeImage);

    changeImage(); // Initial image
    imageInterval = setInterval(changeImage, 10000); // Change image every 10 seconds
  })
  .catch((error) => {
    console.error(error);
  });
