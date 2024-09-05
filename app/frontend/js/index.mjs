import { init, handleDropdownMenu } from './ui.mjs';
const dropdownEl = document.getElementById("hello_select");

window.addEventListener('load', init);

dropdownEl.addEventListener("change", handleDropdownMenu);