require('./style.scss');

const burger = document.getElementById("burger-menu");
const closeBtn = document.getElementById("closeBtn");
const nav = document.querySelector(".menu");

burger.addEventListener("click", () => {
    nav.classList.add("active");
});

closeBtn.addEventListener("click", () => {
    nav.classList.remove("active");
});
const searchBtn = document.getElementById("searchBtn");
const mobileBtns = document.querySelector(".mobile-btn");

searchBtn.addEventListener("click", () => {
    mobileBtns.classList.toggle("search-active");
});

document.addEventListener("click", (e) => {

    if (!mobileBtns.contains(e.target)) {
        mobileBtns.classList.remove("search-active");
    }

    if (!nav.contains(e.target) && !burger.contains(e.target)) {
        nav.classList.remove("active");
    }

});