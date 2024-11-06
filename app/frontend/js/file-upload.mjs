const fileInput = document.getElementById('inputFile');
const uploadBtn = document.getElementById('upload_btn');
const fileList = document.getElementById('uploadedFileList');
const deleteAllBtn = document.getElementById('deleteAll_btn');

const url = `http://localhost:${window.location.port || 5000}`;

const makeHttpRequest = async ({ url, method, headers, body }) => {
    const request = new Request(url, { method, headers, body });
    const response = await fetch(request);
    return console.log(await response.json());
}

const filesPicked = (e) => {
    const input = e.target;
    const files = input.files;
}

const uploadFile = async (e) => {
    if (e.code === 'KeyU') {
        e.preventDefault();
        const files = fileInput.files;
        const length = files.length
        console.log({ files, length });
        
        for (let i = 0; i < length; i++) {
            console.group();
            console.log(files[i].name);
            console.log(files[i].size);
            console.log(files[i].type);
            console.log(files[i].lastModified);
            console.groupEnd();
        }

        const url = `http://localhost:${window.location.port || 5000}`;
        const method = 'POST';
        const headers = { 'Content-Type': 'application/json' };
        const body = JSON.stringify({ message: 'Upload request', level: 'INFO' });
        makeHttpRequest({ url, method, headers, body });
    }    // Keep watching to make sure the file is uploaded server-side
    // https://youtu.be/JtKIcqZdLLM?feature=shared
}

const uploadFile2Server = async (e) => {
    e.preventDefault();

    const files = [];
    const fileList = document.uploadform.uploadedFiles.files;
    for (let i = 0; i < fileList.length; i++) {
        files.push(fileList[i]);
    }
    
    // create any headers we want
    const h = new Headers();
    h.append('Accept', 'image/*'); // what we expect back
    // bundle the files and data we want to send to the server
    let fd = new FormData();
    fd.append('user-name', document.uploadform.name.value);
    files.forEach((file, index) => {
        fd.append(`file-${index}`, file, file.name);
    });
    
    const uploadEndpointPath = url + '/upload';
    const reqUrl = new URL(uploadEndpointPath);
    const request = new Request(reqUrl, {
        method: 'POST',
        headers: h,
        mode: 'no-cors',
        body: fd
    });

    const response = await fetch(request);
    let listData = await response.json();
    listData = [...new Set(listData)];

    updateFileList(listData);
}

const handlePreviewBtnClick = (e) => {
    const fileName = e.currentTarget.dataset.id.replace('previewBtn__', '');
    previewFileFromServer(fileName);
}

const previewFileFromServer = async (fileName) => {
    const previewEndpoint = url + `/preview`;
    const reqUrl = new URL(previewEndpoint);
    reqUrl.searchParams.append('preview', 'true');
    reqUrl.searchParams.append('fileName', fileName);
    
    const request = new Request(reqUrl, { method: 'GET' });
    const response = await fetch(request);
    const blob = await response.blob();
    
    const imageUrl = URL.createObjectURL(blob);
    openModal(fileName, imageUrl);
    modalImage.onload = () => {
        URL.revokeObjectURL(imageUrl);
    }
}

const handleDeleteAllBtnClick = async (e) => {
    if (confirm(`Are you sure you want to delete all files?`)) {
        const files = await getFileNames();
        files.forEach(async file => {
            deleteFileFromServer(file);
        });
    };
}

const handleDeleteBtnClick = (e) => {
    const fileName = e.currentTarget.dataset.id.replace('deleteBtn__', '');
    if (confirm(`Are you sure you want to delete ${fileName}?`)) deleteFileFromServer(fileName);
}

const deleteFileFromServer = async (fileName) => {
    const deleteEndpoint = url + `/delete`;
    const reqUrl = new URL(deleteEndpoint);
    reqUrl.searchParams.append('delete', 'true');
    reqUrl.searchParams.append('fileName', fileName);
    const request = new Request(reqUrl, { method: 'DELETE' }); 

    const response = await fetch(request);
    const resData = await response.json();

    updateFileList(resData.fileList);
}

const updateFileList = async (listData) => {
    fileList.innerHTML = '';
    listData.forEach((file, i) => {
        const listItem = document.createElement('div');
        listItem.classList.add('uploadedListItem');
        fileList.appendChild(listItem);
        
        const fileName = document.createElement('p'); 
        fileName.innerText = file;
        listItem.appendChild(fileName);

        const previewBtn = document.createElement('div');
        previewBtn.id = 'preview_btn';
        previewBtn.classList.add('uploadedListBtn');
        previewBtn.innerText = 'preview';
        previewBtn.setAttribute('data-id', `previewBtn__${fileName.innerText}`);
        previewBtn.removeEventListener('click', handlePreviewBtnClick);
        previewBtn.addEventListener('click', handlePreviewBtnClick);
        listItem.appendChild(previewBtn);

        const deleteBtn = document.createElement('div');
        deleteBtn.id = 'delete_btn';
        deleteBtn.classList.add('uploadedListBtn');
        deleteBtn.innerText = 'delete';
        deleteBtn.setAttribute('data-id', `deleteBtn__${fileName.innerText}`);
        deleteBtn.removeEventListener('click', handleDeleteBtnClick);
        deleteBtn.addEventListener('click', handleDeleteBtnClick);
        listItem.appendChild(deleteBtn);
    });
}

const createArrayBuffer = (e) => {
    if (e.code === 'Space') {
        e.preventDefault();

        // Create an array buffer with 2 bytes
        const ab = new ArrayBuffer(2); //2 bytes / 1 byte = 8 bits 0 - 255
        // Used a DataView to write two numbers to the array buffer
        const dataview = new DataView(ab);
        dataview.setInt8(0, 104)
        dataview.setInt8(1, 105)
        // Created a typed array from the array buffer to view the contents
        console.log(new Uint8Array(ab).toString());

        // Create a blob from the array buffer
        const b = new Blob([ab]);
        console.log(b);

        // Create a file from the array buffer
        const f = new File([ab], 'myinfo.txt', { type: 'text/plain' });
        console.log(f);
        const url = URL.createObjectURL(f)
        const a = document.createElement('a');
        a.href = url;
        a.download = f.name;
        a.textContent = `Download ${f.name}`;
        document.getElementById('main').append(a);
    }
}

const getFileNames = async () => {
    const filenamesEndpoint = url + '/filenames';
    const reqUrl = new URL(filenamesEndpoint);
    const request = new Request(reqUrl, { method: 'GET' });
    
    const response = await fetch(request);
    const filenames = await response.json();
    return filenames;
};

const init = async () => {
    const filenames = await getFileNames();
    updateFileList(filenames);
};

// JavaScript for Modal Functionality
const imageModal = document.getElementById('imageModal');
const modalFileName = document.getElementById('modalFileName');
const modalImage = document.getElementById('modalImage');
const closeModal = document.getElementById('closeModal');

// Function to open the modal
function openModal(fileName, imageUrl) {
    modalFileName.innerText = fileName;       // Set filename in modal
    modalImage.src = imageUrl;                // Set image source in modal
    imageModal.classList.add('show');         // Show modal
}

// Event listener for the close button
closeModal.addEventListener('click', () => {
    imageModal.classList.remove('show');      // Hide modal
});

fileInput.addEventListener('change', filesPicked);
window.addEventListener('keydown', uploadFile);
uploadBtn.addEventListener('click', uploadFile2Server);
deleteAllBtn.addEventListener('click', handleDeleteAllBtnClick);
window.addEventListener('keydown', createArrayBuffer);
document.addEventListener('DOMContentLoaded', init)
