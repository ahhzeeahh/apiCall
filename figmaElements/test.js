console.log('test')
fetch("https://test.txgio.org/contracts/index.json")
    .then(response => response.json())

    .then(data => console.log(data)

)
    .catch(error => console.error('Error:', error)

);