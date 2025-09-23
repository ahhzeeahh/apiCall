
let sectionInsert = document.getElementById("insertContracts")
let p = document.getElementById("status-message")
let abcNav = document.getElementById("alpha-nav")


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
       
       let all = data.providers //change this to .all later!!!!!!!!!!!!!!!

       console.log(all);

       function makeBlocks(currArr) {
                sectionInsert.innerHTML = "" // clear before each round
                p.innerHTML = "";
                    currArr.forEach(e => {

                        let divHolder = document.createElement("div");
                        divHolder.className = "contract-box"

                        divHolder.innerHTML = `
                                <img alt="${e.Title} logo and web links" class="d-block w-100" src="${e.Logo}"
                                <a  href="${e.website}" target= "_blank">Contact Page</a>
                                <a  href="${e.DIRlink}" target= "_blank">DIR Contact Page</a>
                    
                        `;   
                        sectionInsert.appendChild(divHolder); 
                    });   
        }

         makeBlocks(all)
         
}
)
    .catch(error => {
      
        setDisplayNone();
        console.log("rip...ERROR =" + error)
});