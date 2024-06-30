
function ptoggle() {
        $("p").toggle();
}
    
 // Calling API  and updating span id = fetchCustDetails
function load() {  
    const apiUrl = 'http://127.0.0.1:5000/all';    
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
                return response.json();
            })
        .then(data => {
            // Display data in an HTML element
            let placeholder = document.getElementById('fetchCustDetails');
            let out = "";
            for(let key of data) {
                out += `<tr><td>${key.id}</td><td>${key.name}</td><td>${key.address}</td></tr>`;
            }             
            placeholder.innerHTML = out; 
        })
        .catch(error => {
            console.error('Error:', error);
    });  
}
    