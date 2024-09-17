console.log('api loaded');

const bookmarksGroup = document.getElementById('bookmarks_group');
const urlTextInput = document.getElementById('urlTextInput');
const nameTextInput = document.getElementById('nameTextInput');
const urlSubmit = document.getElementById('urlSubmit');

const urlBookmarks = [
    {
        name: 'Google',
        url: 'www.google.com' 
    }
];

const pendingBookmark = {
    name: '',
    url: ''
} 

const handleNameInput = (e) => {
    pendingBookmark.name = e.target.value;
}
nameTextInput.addEventListener('input', handleNameInput);
const handleUrlInput = (e) => {
    pendingBookmark.url = e.target.value;
}
urlTextInput.addEventListener('input', handleUrlInput);

const addBookmark = () => {
    urlBookmarks.push({
        name: pendingBookmark.name, 
        url: pendingBookmark.url 
    });
    const newBookmark = document.createElement('div');
    newBookmark.className = 'bookmarks_btn';  
    newBookmark.textContent = pendingBookmark.name;
    console.log(newBookmark);
    bookmarksGroup.appendChild(newBookmark);

}
const handleUrlSubmit = () => {
    addBookmark();
    urlTextInput.value = '';
    nameTextInput.value = '';
    pendingBookmark.name = '';
    pendingBookmark.url = '';
};
urlSubmit.addEventListener('click', handleUrlSubmit);