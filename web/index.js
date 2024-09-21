
function ptoggle() {
        $("p").toggle();
}


//Test connectivity
function testConn() { 
    const apiUrl = 'http://127.0.0.1:5000/';
    const placeholder = document.getElementById('testConnResp');
    fetch(apiUrl).then((response) => {
        if (response.ok) {
          return response.status;
        }
        throw new Error('Something went wrong');
      })
      .then((status) => {
        // Do something with the response
        placeholder.innerHTML = `<p> Status: ${status}</p>`;
      })
      .catch((error) => {
        console.log(error)
        placeholder.innerHTML = `<p> Status: Unable to connect : ${error}</p>`;
      });
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
            const placeholder = document.getElementById('fetchCustDetails');
            let out = "";
            for(let key of data) {
                out += `<tr><td>${key.id}</td><td>${key.name}</td><td>${key.address}</td></tr>`;
            }             
            placeholder.innerHTML = out; 
        })
        .catch(error => {
            console.error('Error:', error);
            const placeholder = document.getElementById('fetchCustDetails');
            placeholder.innerHTML = `<tr><b>${error}</b></tr>`; 
    });  
}
 
// function loadOne() {  
//     const apiUrl = 'http://127.0.0.1:5000/id/2';
//     const  placeholder = document.getElementById('fetchOneCustDetails');
//     fetch(apiUrl)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//                 return response.json();
//             })
//         .then(data => {
//             // Display data in an HTML element    
//             let out = "";    
//             for(let key of data) {
//                 out += `<tr><td>${key.id}</td><td>${key.name}</td><td>${key.address}</td></tr>`;
//             }             
//             placeholder.innerHTML = dataDisplay; 
//         })
//         .catch(error => {
//             console.error('Error:', error);
//     });  
// }

// 	const payload = await getData();
// 	let dataDisplay = payload.map((object) => {
// 	const { name , address } = object;
// 	return `html ${name} and ${address}`
//  });
// display.innerHTML = dataDisplay;


function loadOne() {
    const apiEndPoint = 'http://127.0.0.1:5000/id/2'; 
    const display = document.getElementById('fetchOneCustDetails');
    //fun to get response
    const getOneData =  async () => { 
        const response = await fetch(apiEndPoint);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        return response.json();
    }
    //fun to display the data
    const displayUser = async () => {
        const payload = await getOneData();
        let dataDisplay = payload.map((object) => {
        const { id, name, address } = object;
        return `<tr><td>${id}</td><td>${name}</td><td>${address}</td></tr>`
    }).join("");
    display.innerHTML = dataDisplay;
    console.log(dataDisplay)
    }
    //calling display fun
    displayUser();
}