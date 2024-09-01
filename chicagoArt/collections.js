

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
  
    fetch(url).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Something went wrong on API server!");
      }
    }).then((data) => {
      let col = data.data;
      let numb = Math.floor(Math.random() * col.length);
      var apiImg = document.querySelector("#api-img");
      var subhead = document.querySelector("#subhead");
      var apiTitle = document.querySelector("#api-title");
      var art = document.querySelector("#art");
      var post = col[numb];
      let i = 0
      while (post.is_public_domain == true) {
        let imgSrc = "https://www.artic.edu/iiif/2/" + post.image_id + "/full/600,/0/default.jpg";
        apiImg.setAttribute("src", imgSrc);
        i++
      }

function name(params) {
  
   document.querySelector(button).addEventListener("click", )
}

for (let post = 0; post < array.length; post++) {
  const element = array[post];
  
}


    }).catch((error) => {
      console.error(error);
    });

  })

  let url = "https://api.artic.edu/api/v1/artworks?fields=id,image_id,title,artist_title,date_display,provenance_text,is_public_domain&limit=40";
  let sectionCount = 0; // Track current section
  
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Something went wrong on API server!");
      }
    })
    .then((data) => {
      let col = data.data;
  
      function changeImage() {
        let imageFound = false; // Flag to check if public domain image found
  
        for (let i = 0; i < col.length; i++) {
          const post = col[i];
          if (post.is_public_domain) {
            let imgSrc = "https://www.artic.edu/iiif/2/" + post.image_id + "/full/600,/0/default.jpg";
            var apiImg = document.querySelector("#api-img");
            var subhead = document.querySelector("#subhead");
            var apiTitle = document.querySelector("#api-title");
            var art = document.querySelector("#art");
  
            apiImg.setAttribute("src", imgSrc);
            subhead.textContent = post.artist_title; // Assuming subhead displays artist title
            apiTitle.textContent = post.title; // Assuming apiTitle displays title
  
            imageFound = true;
            break; // Exit loop after finding a public domain image
          }
        }
  
        if (!imageFound) {
          console.warn("No public domain image found in this section.");
        }
      }
  
      changeImage(); // Call initially
      
      // Change image every 10 sections (assuming you have a way to detect sections)
      window.addEventListener("scroll", () => {
        sectionCount++;
        if (sectionCount % 10 === 0) {
          changeImage();
        }
      });
    })
    .catch((error) => {
      console.error(error);
    });
  
  
  
  
    let url = "https://api.artic.edu/api/v1/artworks?fields=id,image_id,title,artist_title,date_display,provenance_text,is_public_domain&limit=40";
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
      const publicDomainImages = col.filter(post => post.is_public_domain);
  
      function changeImage() {
        const randomIndex = Math.floor(Math.random() * col.length);
        const post = publicDomainImages[randomIndex];
  
        const imgSrc = "https://www.artic.edu/iiif/2/" + post.image_id + "/full/600,/0/default.jpg";
        const apiImg = document.querySelector("#api-img");
        apiImg.setAttribute("src", imgSrc);
      }
  
      changeImage(); // Initial image
      imageInterval = setInterval(changeImage, 10000); // Change image every 10 seconds
    })
    .catch((error) => {
      console.error(error);
    });