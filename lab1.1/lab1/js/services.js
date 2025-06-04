function loadServices(filter = '') {
  fetch(`php/get-services.php?filter=${encodeURIComponent(filter)}`)
    .then(res => res.json())
    .then(data => {
      const catalog = document.getElementById('catalog');
      catalog.innerHTML = '';
      data.forEach(service => {
        catalog.innerHTML += `
          <div class="item" data-id="${service.id}" data-name="${service.name}" data-price="${service.price}">
            <img src="./images/${service.image}" alt="${service.name}" />
            <div>${service.name}</div>
            <button class="add-to-cart">ADD</button>
          </div>
        `;
      });
    })
    .catch(err => {
      console.error('Error loading services:', err);
    });
}


document.addEventListener('DOMContentLoaded', () => {
  loadServices();

  // Пошук (можна зробити input у header або main)
  const form = document.getElementById('search-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const value = document.getElementById('search-input').value;
      loadServices(value);
    });
  }
});
