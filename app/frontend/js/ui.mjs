const titleTextEl = document.getElementById("title_text");
const helloSelectEl = document.getElementById("hello_select");
const containerEl = document.getElementById("container");

const port = window.location.port || 5000;
const host = 'localhost';
const path = '/log';
let mode = 'world';
console.log(`http://${host}:${port}${path}`);

const init = async () => {
    setMode();
    helloSelectEl.focus();

    const url = `http://${host}:${port}${path}`;
    const method = 'POST';
    const headers = { 'Content-Type': 'application/json' };
    const body = JSON.stringify({ message: 'Client side landing page loaded', level: 'INFO' });
    makeHttpRequest({ url, method, headers, body });
};

const handleDropdownMenu = async () => {
    if (helloSelectEl.value === "world" || helloSelectEl.value === "universe") {
        mode = helloSelectEl.value;
        setMode();
    } else if (helloSelectEl.value === "UPLOAD") {
        const url = `http://${host}:${port}/file-upload.html`;
        window.location.href = url;
    } else {
        const url = `http://${host}:${port}${path}`;
        const method = 'POST';
        const headers = { 'Content-Type': 'application/json' };
        const body = JSON.stringify({ message: `This is a ${helloSelectEl.value} level log message`, level: helloSelectEl.value });
        console.log(await makeHttpRequest({  url, method, headers, body }));
    }
};

const setMode = () => {
    if (mode === 'world') {
        containerEl.classList.remove("universe_pic");
        containerEl.classList.add("world_pic");
        titleTextEl.textContent = 'Hello World';
    } else if (mode === 'universe') {
        containerEl.classList.remove("world_pic");
        containerEl.classList.add("universe_pic");
        titleTextEl.textContent = 'Hello Universe';
    }
}

const makeHttpRequest = async ({ url, method, headers, body }) => {
    const response = await fetch(url, { method, headers, body });
    const data = await response.json();
    return data;
}

export { init, handleDropdownMenu };