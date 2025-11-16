
let contractsContainer = document.getElementById("insertContracts")
let statusContainer = document.getElementById("status-message")
let abcNav = document.getElementById("alpha-nav")
let searchBox = document.getElementById("searchBox")
var contracts = []
var filteredContracts = [];

function setDisplayNone() {
  
    setTimeout(() => {
        statusContainer.textContent = "No contracts available"
    }, 500);
    statusContainer.innerHTML = `<img alt="loading image" src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif">`;

}


// create html card for contract from contract object
function createContractCard(contract) {
    let contractCard = document.createElement("div");
    contractCard.className = "contract-box";

    contractCard.innerHTML = `
    <img height="100px" alt="${contract.Title} logo and web links" class="d-block w-100" src="${contract.Logo}">
    <h5 class="mt-3 text-dark fw-bold">${contract.Title}</h5>
    <a  href="${contract.Website}" target= "_blank">Contact Page</a><br>
    <a  href="${contract.DIRlink}" target= "_blank">DIR Contact Page</a>
    `;

    return contractCard
}

// loop through an array of contracts, creating a card for each contract object
// then, append each contract card html to the contracts container
function setContractsContent(contractsArray) {
    contractsContainer.innerHTML = "";
    contractsArray.forEach(contract => {
        const contractHTML = createContractCard(contract);
        contractsContainer.appendChild(contractHTML);
    });
}

async function fetchContracts() {
    const contractsRes = await fetch("https://test.txgio.org/contracts/index.json");
    statusContainer.innerHTML = `<img alt="loading image" src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif">`;

    if (!contractsRes.ok) {
          statusContainer.innerHTML = `No Contracts at the moment.`
        console.error("Failed to fetch contracts. Please try reloading the page.");
        return
    }

    const contractsJson = await contractsRes.json();

    statusContainer.innerHTML = "";
      console.log(contractsJson.providers)
    return contractsJson.providers;
  
}

//------------THIS IS THE MAIN FUCTION HERE-----------------------------
async function init() {
    searchBox.disabled = true;
    //show all gathers json items
    contracts = await fetchContracts();
    console.log(contracts)
    searchBox.disabled = false;
    //listen for types search
    searchBox.addEventListener("input", searchContracts);
    // listen for click filter
    abcNav.addEventListener("click", searchABC);
    //update all contracts
    setContractsContent(contracts);
}
//------------THIS IS THE MAIN FUCTION HERE-----------------------------

async function searchContracts(event) {
   contractsContainer.innerHTML = ""
    statusContainer.textContent = ""
    
    const searchText = event.target.value;
       console.log("search triggered = " + searchText);
    if (!searchText || searchText.length == 0) {
        setContractsContent(contracts);
        return;
    }
    filteredContracts = contracts
    /* filteredContracts = contracts.map(contract => {
        const distance = levenshteinDistance(contract.Title.toUpperCase(), searchText.toUpperCase());
        const shorter = Math.min(searchText.length, contract.Title.length);
        const normalizedDistance = normalizeLevenshtein(shorter, distance);
        //console.log(`contract: ${contract.Title}, distance: ${distance}, shorter: ${shorter}, normalized distance: ${normalizedDistance}`);
        const scoredContract = { ...contract, distance: distance }
        return scoredContract;
    }); */

    filteredContracts = filteredContracts
                        .filter(contract => contract.Title.toUpperCase().includes(searchText.toUpperCase()))
                        .sort((contract_a,contract_b) => contract_a.Title > contract_b.Title);
    
    setContractsContent(filteredContracts);
}

function searchABC(e) {
             contractsContainer.innerHTML = ""
             statusContainer.textContent = ""
             
            let testName = e.target.innerText
         
            let afterArr = contracts.filter(beforeArr => beforeArr.Tab === testName);
            if (afterArr.length == 0 && testName != "All") {
                  
            
                setDisplayNone()
            }else if (afterArr.length == 0 && testName == "All"){
               
                 setContractsContent(contracts);
              
            }else{
             
               setContractsContent(afterArr);
            }
        }
    



init();
