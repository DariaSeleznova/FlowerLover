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

const filters = document.querySelectorAll(".filter");

filters.forEach(filter => {
    const header = filter.querySelector(".filter__header_btn");
    const value = filter.querySelector(".filter__value");
    const checkboxes = filter.querySelectorAll("input[type='checkbox']");
    const applyBtn = filter.querySelector(".apply-btn");

    header.addEventListener("click", (e) => {
        e.stopPropagation();

        filters.forEach(f => {
            if (f !== filter) f.classList.remove("active");
        });

        filter.classList.toggle("active");
    });

    applyBtn.addEventListener("click", (e) => {
        e.stopPropagation();

        const selected = [];

        checkboxes.forEach(cb => {
            if (cb.checked) {
                selected.push(cb.value);
            }
        });

        value.textContent = selected.length
            ? ": " + selected.join(", ")
            : "";

        filter.classList.remove("active");
    });
});

document.addEventListener("click", (e) => {
    filters.forEach(filter => {
        if (!filter.contains(e.target)) {
            filter.classList.remove("active");
        }
    });
});