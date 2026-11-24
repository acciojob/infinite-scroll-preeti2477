//your code here!
// script.js - Infinite Scroll

// script.js - Infinite Scroll

const list = document.getElementById('infi-list');
let count = 0;

function createItem() {
  count++;
  const li = document.createElement('li');
  li.textContent = `List Item ${count}`;
  return li;
}

function addItems(n) {
  for (let i = 0; i < n; i++) {
    list.appendChild(createItem());
  }
}

// 1. Default 10 items
addItems(10);

// 2. Infinite Scroll - End pe 2 aur add karo

// Window Scroll
window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 10) {
    addItems(2);
  }
});

// Agar #infi-list khud scrollable hai to uska scroll bhi suno
list.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = list;
  if (scrollTop + clientHeight >= scrollHeight - 10) {
    addItems(2);
  }
});

// IntersectionObserver - Sabse reliable
const sentinel = document.createElement('div');
sentinel.id = 'sentinel';
list.after(sentinel);

const observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    addItems(2);
  }
}, {
  threshold: 0.1
});

setTimeout(() => {
  observer.observe(sentinel);
}, 500);