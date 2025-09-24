
let sectionInsert = document.getElementById("insertContracts")
let p = document.getElementById("status-message")
let abcNav = document.getElementById("alpha-nav")

function setDisplayNone() {
      setTimeout(() =>{
         p.textContent = "No contracts available at the moment..."
            }, 500);
        p.innerHTML=  `<img alt="loading image" src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif">`
       
}

fetch("https://test.txgio.org/contracts/index.json")

    .then((response) => {
      if (response.ok == true) {
        return response.json()

      } else {
        setDisplayNone();
        console.log("hi")
         }
})
    .then(data => {
       p.innerHTML=  `<img alt="loading image" src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif">`;
       let allContracts = data.providers 


        function getArrayFiltered(e) {
            console.log("i clicked " + e.target.innerText)

            let afterArr = allContracts.filter(beforeArr => beforeArr.Tab === e.target.innerText);
            if (afterArr.length == 0) {
                sectionInsert.innerHTML = ""
                setDisplayNone()
            }else{
                makeBlocks(afterArr)
            }
        }
            



       function makeBlocks(currentArr) {
                sectionInsert.innerHTML = "" // clear before each round
                p.innerHTML = "";
                    currentArr.forEach(e => {
                        
                        let divHolder = document.createElement("div");
                        divHolder.className = "contract-box"

                        divHolder.innerHTML = `
                                <img height="100px" alt="${e.Title} logo and web links" class="d-block w-100" src="${e.Logo}">
                                <h5 class="mt-3 text-dark fw-bold">${e.Title}</h5>
                               <a  href="${e.Website}" target= "_blank">Contact Page</a><br>
                                <a  href="${e.DIRlink}" target= "_blank">DIR Contact Page</a>
                    
                        `;   
                        sectionInsert.appendChild(divHolder); 
                    });   
        }

         makeBlocks(allContracts)
         abcNav.addEventListener('click', getArrayFiltered);
         
}
)
    .catch(error => {
      
        setDisplayNone();
        console.log("rip...ERROR =" + error)
});

