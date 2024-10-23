const addNewItemButton = document.getElementById('addNewItemButton');
const editMenuItemsButton = document.getElementById('editMenuItemsButton');
const addDishForm = document.getElementById('addDishForm');
const editMenuForm = document.getElementById('editMenuForm');
const menuList = document.getElementById('menuList');
const headerProfilePic = document.getElementById('header-profile-image'); // Ensure the correct ID is used

// Load items and profile image from localStorage when the page loads
window.onload = function() {
  loadMenuItems();
  loadProfileImage(); // Call function to load the profile image
};

// Function to load profile image
function loadProfileImage() {
  const storedImage = localStorage.getItem('profileImage') || './images/profile logo.png'; // Default image
  headerProfilePic.src = storedImage; // Update the profile picture in the header
}

// Event listeners for button clicks
addNewItemButton.addEventListener('click', () => {
  addDishForm.classList.remove('hidden');
  editMenuForm.classList.add('hidden');
  scrollToElement(addDishForm);
});

editMenuItemsButton.addEventListener('click', () => {
  editMenuForm.classList.remove('hidden');
  addDishForm.classList.add('hidden');
  scrollToElement(editMenuForm);
});

// Handling form submission to add a new dish
addDishForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const dishName = document.getElementById('dishName').value;
  const dishPrice = document.getElementById('dishPrice').value;
  const dishImage = document.getElementById('dishImage').files[0];

  if (dishImage) {
    const reader = new FileReader();
    reader.onload = function(event) {
      const dish = {
        name: dishName,
        price: dishPrice,
        image: event.target.result
      };

      saveDishToLocalStorage(dish);
      addMenuItem(dish);
      addDishForm.reset(); // Reset form fields
    };

    reader.readAsDataURL(dishImage);
  }
});

// Load dishes from localStorage
function loadMenuItems() {
  const menuItems = JSON.parse(localStorage.getItem('menuItems')) || [];
  menuItems.forEach(addMenuItem);
}

// Save dish to localStorage
function saveDishToLocalStorage(dish) {
  const menuItems = JSON.parse(localStorage.getItem('menuItems')) || [];
  menuItems.push(dish);
  localStorage.setItem('menuItems', JSON.stringify(menuItems));
}

// Add a dish to the menu list
function addMenuItem(dish) {
  const colDiv = document.createElement('div');
  colDiv.classList.add('col-md-4', 'mb-3');

  const cardDiv = document.createElement('div');
  cardDiv.classList.add('card', 'h-100');

  const img = document.createElement('img');
  img.src = dish.image;
  img.alt = dish.name;
  img.classList.add('card-img-top', 'img-fluid');

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body', 'text-center');

  const dishTitle = document.createElement('h5');
  dishTitle.textContent = dish.name;
  dishTitle.classList.add('card-title');

  const dishPriceElement = document.createElement('p');
  dishPriceElement.innerHTML = `Price: <span class="price">${dish.price} JD</span>`;
  dishPriceElement.classList.add('card-text');

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.classList.add('btn', 'Custom-secondary', 'mt-2');
  deleteButton.addEventListener('click', () => {
    colDiv.remove();
    deleteDishFromLocalStorage(dish);
  });

  cardBody.append(dishTitle, dishPriceElement, deleteButton);
  cardDiv.append(img, cardBody);
  colDiv.append(cardDiv);
  menuList.append(colDiv);
}

// Delete a dish from localStorage
function deleteDishFromLocalStorage(dishToRemove) {
  const menuItems = JSON.parse(localStorage.getItem('menuItems')) || [];
  const updatedItems = menuItems.filter(dish => dish.name !== dishToRemove.name);
  localStorage.setItem('menuItems', JSON.stringify(updatedItems));
}

// Scroll to a specific element
function scrollToElement(element) {
  const headerOffset = 100; // Adjust based on your header height
  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
  const offsetPosition = elementPosition - headerOffset;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
}
