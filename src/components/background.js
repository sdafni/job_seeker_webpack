

// let jobTitle = "initial bg injected job title"
// let companyName = "initial bg injected company name"

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {

    if (message.from == "Li-content-script"){
        console.log("got message from Li")

        payload = JSON.stringify({jobTitle: message.jobTitle, companyName: message.companyName});

          // Post the payload using Fetch:
    fetch('http://localhost:5000/tasks', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },

        body: payload,
    })
        .then(function (res) {
            console.log(res); return res.json();
        })
        .then(data => console.log(data))


    }
});