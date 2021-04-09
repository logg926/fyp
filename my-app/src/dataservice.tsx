export async function postData(url = '', data = {}) {
    // Default options are marked with *
    console.error(JSON.stringify({...data, sourceimg: "hi"}))
    const result = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return result.json(); // parses JSON response into native JavaScript objects
}



// // testing part for the api
// const url = 'http://127.0.0.1:8000/svm_test';
// let data = detectimg;
// const othePram = {
//     body: data,
//     method: "POST"
// }