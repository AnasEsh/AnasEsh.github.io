function tst(){
    fetch('https://127.0.0.1:9100',{
        'method':'POST',
        'body':JSON.stringify([
        '\x1B@', 
        '\x1Ba1', 
        '\x1B!\x08',
        'Hello World 123',
        '\x1B@'
      ])
    })
    .catch(e=>{
        alert(e.message)
    })
}
async function printEscCommandsToPOSPrinter(commands) {
    const encoder = new TextEncoder();
    const delay = 50; // Adjust the delay as needed

    // Iterate through the commands and send them to the printer
    for (const command of commands) {
        const data = encoder.encode(command);
        // Replace this with your actual printer write function
        sendDataToPrinter(data);
        await new Promise(resolve => setTimeout(resolve, delay));
    }
}

function sendDataToPrinter(data) {
    fetch('https://127.0.0.1:9100',{
    'method':'POST',
    'body':data
})
.catch(e=>{
    alert(e.message)
})
}

function sendToLocalhost() {
    try {
        eval(document.querySelector("#code-holder").value)
    } catch (e) {
        alert(e.message)
    }
}

function sendCommandsList(){
    printEscCommandsToPOSPrinter(
        document.querySelector("#code-holder").value.replaceAll('\n',' ').trim().split(',').map(e=>e.trim())
    )
}