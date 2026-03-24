const { forEach } = require('lodash');

require('./style.scss');

// ============ DOM Elements ============
const burger = document.getElementById("burger-menu");
const closeBtn = document.getElementById("closeBtn");
const nav = document.querySelector(".menu");
const searchBtn = document.getElementById("searchBtn");
const mobileBtns = document.querySelector(".mobile-btn");
const filters = document.querySelectorAll(".filter");
const likes = document.querySelectorAll(".product-card__like");
const cards = document.querySelectorAll(".product-card");
const form = document.querySelector(".form form");
const success = document.getElementById("formSuccess");
const closeSuc = document.querySelector(".close_success");
const formBlock = document.querySelector(".form");
const discForm = document.querySelector(".form_discription");
const section = document.querySelector(".form_content");
const items = document.querySelectorAll(".form_discription li");


// ============ Mobile Menu ============
burger.addEventListener("click", () => {
    nav.classList.add("active");
});

closeBtn.addEventListener("click", () => {
    nav.classList.remove("active");
});

// ============ Search Button ============
searchBtn.addEventListener("click", () => {
    mobileBtns.classList.toggle("search-active");
});

// ============ Close Elements on Outside Click ============
document.addEventListener("click", (e) => {
    if (!mobileBtns.contains(e.target)) {
        mobileBtns.classList.remove("search-active");
    }

    if (!nav.contains(e.target) && !burger.contains(e.target)) {
        nav.classList.remove("active");
    }
});

// ============ Filters ============
filters.forEach(filter => {
    const header = filter.querySelector(".filter__header_btn");
    const value = filter.querySelector(".filter__value");
    const checkboxes = filter.querySelectorAll("input[type='checkbox']");
    const applyBtn = filter.querySelector(".apply-btn");

    header.addEventListener("click", (e) => {
        e.stopPropagation();
        filters.forEach(f => f !== filter && f.classList.remove("active"));
        filter.classList.toggle("active");
    });

    applyBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const selected = Array.from(checkboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value);
        value.textContent = selected.length ? ": " + selected.join(", ") : "";
        filter.classList.remove("active");
    });
});

document.addEventListener("click", (e) => {
    filters.forEach(filter => {
        !filter.contains(e.target) && filter.classList.remove("active");
    });
});

// ============ Product Card Likes ============
likes.forEach(btn => {
    btn.addEventListener("click", () => {
        btn.classList.toggle("active");
    });
});

// ============ Product Card Toggle ============
cards.forEach(card => {
    card.addEventListener("click", (e) => {
        if (e.target.closest(".product-card__actions")) return;
        cards.forEach(c => c !== card && c.classList.remove("active"));
        card.classList.toggle("active");
    });
});

document.addEventListener("click", (e) => {
    !e.target.closest(".product-card") &&
        cards.forEach(c => c.classList.remove("active"));
});

// ============ Product Card Quantity ============
cards.forEach(card => {
    const minus = card.querySelector(".minus");
    const plus = card.querySelector(".plus");
    const value = card.querySelector(".qty-value");

    plus.addEventListener("click", (e) => {
        e.stopPropagation();
        value.textContent = parseInt(value.textContent) + 1;
    });

    minus.addEventListener("click", (e) => {
        e.stopPropagation();
        const count = parseInt(value.textContent);
        if (count > 1) value.textContent = count - 1;
    });
});

// ============ Form Submission ============
form.addEventListener("submit", (e) => {
    e.preventDefault();
    section.classList.add("success-active");
    formBlock.style.display = "none";
    discForm.style.display = "none";
    success.style.display = "flex";
});

closeSuc.addEventListener("click", () => {
    success.style.display = "none";
    formBlock.style.display = "block";
    discForm.style.display = "block";
    form.reset();
});

// ============ Intersection Observer ============
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

items.forEach(item => observer.observe(item));

// ============ Carousel (Basic Implementation) ============
const track = document.querySelector(".clients_cards");
const clientCards = document.querySelectorAll(".client_card");
const slider = document.querySelector(".clients_cards");

function updateActiveCard() {
    const cards = document.querySelectorAll(".client_card"); // ← внутри функции

    let center = slider.scrollLeft + slider.offsetWidth / 2;

    cards.forEach(card => {
        const cardCenter =
            card.offsetLeft + card.offsetWidth / 2;

        if (Math.abs(center - cardCenter) < card.offsetWidth / 2) {
            card.classList.add("active");
        } else {
            card.classList.remove("active");
        }
    });
}
slider.addEventListener("scroll", updateActiveCard);
// 👉 вправо (2,3,4,1) 
nextBtn.addEventListener("click", () => { const first = track.firstElementChild; track.appendChild(first); });
// 👉 влево (4,1,2,3) 
prevBtn.addEventListener("click", () => { const last = track.lastElementChild; track.prepend(last); });

updateActiveCard();