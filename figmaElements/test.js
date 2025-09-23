
let sectionInsert = document.getElementById("insertContracts")
let p = document.getElementById("status-message")
let abcNav = document.getElementById("alpha-nav")
let currArr = ""

function setDisplayNone() {
    p.innerHTML = "No contracts available at the moment..."
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
       
       let allContracts = data.providers 
       console.log(allContracts)

        function getArrayFiltered(e) {

            let afterArr = allContracts.filter(beforeArr => e.target.innerText == beforeArr.Tab);
            console.log(afterArr)
            if (afterArr.length = 0) {
                setDisplayNone()    
            }else{
            afterArr = currArr;
            console.log(currArr)
            makeBlocks(currArr)
            }
        }
            



       function makeBlocks(currArr) {
                sectionInsert.innerHTML = "" // clear before each round
                p.innerHTML = "";
                    currArr.forEach(e => {
                        console.log(e.Tab == "A")
                        let divHolder = document.createElement("div");
                        divHolder.className = "contract-box"

                        divHolder.innerHTML = `
                                <img height="60px" alt="${e.Title} logo and web links" class="d-block w-100" src="${e.Logo}">
                                <h5 class="mt-3 text-dark fw-bold">${e.Title}</h5>
                               <a  href="${e.website}" target= "_blank">Contact Page</a><br>
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

