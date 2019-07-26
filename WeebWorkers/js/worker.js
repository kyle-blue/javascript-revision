//Self is almost equivalent to "window" in this context
//We simply use self since we dont have access to DOM from this thread, so we cannot use "document" or "window"
self.addEventListener("message", handleMessage);
function handleMessage(message) {

    if(message.data !== "DO WORK"){
        postMessage("ERROR: WILL NOT DO WORK... MESSAGE MUST BE 'DO WORK'");
        return;
    }

    let count = 1;
    for(let i = 1; i < 1000000000; ++i){
        count += i;
        if(i % 1000001 === 0)
            postMessage(count);
    }

    console.log(`WORKER --- COUNT: ${count}`);
    postMessage(count);

    setTimeout(() => postMessage("CLOSE"), 3000);
}