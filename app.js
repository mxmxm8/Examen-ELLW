//Api url
const API_URL = "https://bn9ct5dd-3000.uks1.devtunnels.ms/";
const getItems = (data) => data;         
const getId    = (i) => i.id;            
const getName  = (i) => i.title;         
const getImg   = (i) => i.image;          
const getPrice = (i) => Number(i.price);  

const state = { items: [], cart: [] };
const list     = document.getElementById("list");
const detail   = document.getElementById("detail");
const search   = document.getElementById("search");
const category = document.getElementById("category");
const findItem = (id) => state.items.find(i => String(getId(i)) === String(id));


async function init() {
  try {
    list.innerHTML = "<p>C</p>";
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("HTTP " + res.status);
    const data = await res.json();
    state.items = getItems(data);
    fillCategories();              
    renderList(state.items);
  } catch (err) {
    console.error(err);
    list.innerHTML = "<p>Error al cargar los datos</p>";
  }
}





function renderList(items) {
  if (items.length === 0) {
    list.innerHTML = "<p>Sin resultados</p>";
    return;
  }
  list.innerHTML = items.map(i => `
    <div class="card" data-id="${getId(i)}">
      <img src="${getImg(i)}" alt="${getName(i)}">
      <h3>${getName(i)}</h3>
      <p>${getPrice(i)} Bounty</p>
    </div>
  `).join("");







}



