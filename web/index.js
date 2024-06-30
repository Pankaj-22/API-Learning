
function ptoggle() {
        $("p").toggle();
}
    
 // Calling API 
function load() {  
        const apiUrl = 'http://127.0.0.1:5000/all';
        // const apiUrl = 'https://reqres.in/api/users/2'
        const outputElement = document.getElementById('name');

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                    return response.json();
                })
            .then(data => {
                // Display data in an HTML element
                outputElement.textContent = JSON.stringify(data, null, 2);
            })
            .catch(error => {
                console.error('Error:', error);
        });  
}
    