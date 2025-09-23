
var sectionInsert = document.getElementById("insertContracts")
function setDisplayNone() {
    let p = document.getElementById("status-message")
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
       
        let all = data.results //change this to .all later!!!!!!!!!!!!!!!

         console.log(all);

       

         
}
)
    .catch(error => {
      
        setDisplayNone();
        console.log("rip...ERROR =" + error)
});