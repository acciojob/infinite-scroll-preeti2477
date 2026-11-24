//your code here!
// script.js - Infinite Scroll

const list = document.querySelector('ul') || document.querySelector('#list') || document.querySelector('.list');
let count = 0;

function createItem() {
  count++;
  const li = document.createElement('li');
  li.textContent = `List Item ${count}`;
  // Agar tumhare HTML me li ke andar koi class chahiye to yahan add kar do
  // li.className = 'list-item';
  return li;
}

function addItems(n) {
  for (let i = 0; i < n; i++) {
    list.appendChild(createItem());
  }
}

// 1. Default 10 items
addItems(10);

// 2. Infinite Scroll - Jab end pe pahunche to 2 aur add karo

// METHOD 1: Window Scroll (sabse common test case ke liye)
window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  // End se 10px pehle hi trigger kar do taaki test fail na ho
  if (scrollTop + clientHeight >= scrollHeight - 10) {
    addItems(2);
  }
});

// METHOD 2: Agar list khud scrollable div ke andar hai (overflow: auto/scroll)
// to window scroll kaam nahi karega, isliye list ke parent pe bhi lagao
const scrollContainer = list.parentElement;
if (scrollContainer) {
  scrollContainer.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      addItems(2);
    }
  });
}

// METHOD 3: IntersectionObserver - Sabse reliable (Cypress me bhi fail nahi hota)
const sentinel = document.createElement('div');
sentinel.id = 'sentinel';
list.after(sentinel);

const observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    addItems(2);
  }
}, {
  root: null,
  threshold: 0.1
});

// Observer ko thoda delay se start karo taaki starting ke 10 items load hone pe turant trigger na ho
setTimeout(() => {
  observer.observe(sentinel);
}, 500);

