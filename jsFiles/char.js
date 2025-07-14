// Hamburger Menu
const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");

hamburger.addEventListener("click", () => {
  menu.classList.toggle("show");
  hamburger.classList.toggle("active");
});

// Navbar Scroll Effect
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  
  if (scrollTop > 500) {
    navbar.classList.add("fixed");
  } else {
    navbar.classList.remove("fixed");
  }
  
  if (scrollTop > 300) {
    navbar.classList.add("fixed2");
    if (hamburger.classList.contains("active") && menu.classList.contains("show")) {
      menu.classList.remove("show");
      hamburger.classList.remove("active");
    }
  } else {
    navbar.classList.remove("fixed2");
  }
});

// Dropdown Toggle
const dropdownToggles = document.querySelectorAll('.dropbtn');

dropdownToggles.forEach(toggle => {
  toggle.addEventListener('click', function() {
    const menu = this.nextElementSibling;
    
    // Close all other dropdowns
    document.querySelectorAll('.dropdown-menu').forEach(m => {
      if (m !== menu) m.style.display = 'none';
    });
    
    // Toggle current dropdown
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
  });
});

// Close dropdowns when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.dropdown')) {
    document.querySelectorAll('.dropdown-menu').forEach(menu => {
      menu.style.display = 'none';
    });
  }
});

// Character Filter System
const characterItems = document.querySelectorAll('.char .detail');
const searchBar = document.getElementById('searchBar');

// Filter state
const filters = {
  class: 'all',
  star: 'default',
  hp: 'default',
  atk: 'default',
  def: 'default'
};

// Label elements
const labels = {
  class: document.querySelector('#classBtn .label'),
  star: document.querySelector('#starBtn .label'),
  hp: document.querySelector('#hpBtn .label'),
  atk: document.querySelector('#atkBtn .label'),
  def: document.querySelector('#defBtn .label')
};

// Label text mapping
const labelText = {
  'default': 'DEFAULT',
  'highest': 'HIGHEST',
  'lowest': 'LOWEST'
};

// Search functionality
searchBar.addEventListener('input', function() {
  const query = this.value.trim().toLowerCase();
  
  characterItems.forEach(item => {
    if (!item.dataset.class) return; // Skip empty placeholders
    
    const name = item.querySelector('.name span').textContent.toLowerCase();
    item.style.display = name.includes(query) ? 'block' : 'none';
  });
});

// Update character display based on filters
function updateCharacterDisplay() {
  let filtered = [...characterItems].filter(item => item.dataset.class); // Remove empty
  
  // Apply class filter
  if (filters.class !== 'all') {
    filtered = filtered.filter(item => item.dataset.class === filters.class);
  }
  
  // Apply sorting based on active filter
  const activeFilter = Object.entries(filters).find(([key, value]) => 
    key !== 'class' && value !== 'default'
  );
  
  if (activeFilter) {
    const [filterType, filterValue] = activeFilter;
    
    filtered.sort((a, b) => {
      const aValue = parseInt(a.dataset[filterType]) || 0;
      const bValue = parseInt(b.dataset[filterType]) || 0;
      return filterValue === 'highest' ? bValue - aValue : aValue - bValue;
    });
  }
  
  // Update DOM
  const container = document.querySelector('.char');
  container.innerHTML = '';
  filtered.forEach(item => container.appendChild(item));
}

// Set filter function
function setFilter(type, value) {
  // Reset other stat filters when one is set
  if (type !== 'class') {
    filters.star = 'default';
    filters.hp = 'default';
    filters.atk = 'default';
    filters.def = 'default';
    
    labels.star.textContent = 'Star';
    labels.hp.textContent = 'HP';
    labels.atk.textContent = 'ATK';
    labels.def.textContent = 'DEF';
  }
  
  // Set the new filter
  filters[type] = value;
  
  // Update label
  labels[type].textContent = type === 'class' 
    ? (value === 'all' ? 'Class' : capitalize(value))
    : (value === 'default' ? type.toUpperCase() : labelText[value]);
  
  updateCharacterDisplay();
}

// Helper function to capitalize strings
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Event listeners for filter dropdowns
// Class filters
document.getElementById('all').addEventListener('click', () => setFilter('class', 'all'));
document.getElementById('fighter').addEventListener('click', () => setFilter('class', 'fighter'));
document.getElementById('mage').addEventListener('click', () => setFilter('class', 'mage'));
document.getElementById('ranger').addEventListener('click', () => setFilter('class', 'ranger'));
document.getElementById('assassin').addEventListener('click', () => setFilter('class', 'assassin'));
document.getElementById('support').addEventListener('click', () => setFilter('class', 'support'));

// Star filters
document.getElementById('default-star').addEventListener('click', () => setFilter('star', 'default'));
document.getElementById('highest-star').addEventListener('click', () => setFilter('star', 'highest'));
document.getElementById('lowest-star').addEventListener('click', () => setFilter('star', 'lowest'));

// HP filters
document.getElementById('default-hp').addEventListener('click', () => setFilter('hp', 'default'));
document.getElementById('highest-hp').addEventListener('click', () => setFilter('hp', 'highest'));
document.getElementById('lowest-hp').addEventListener('click', () => setFilter('hp', 'lowest'));

// ATK filters
document.getElementById('default-atk').addEventListener('click', () => setFilter('atk', 'default'));
document.getElementById('highest-atk').addEventListener('click', () => setFilter('atk', 'highest'));
document.getElementById('lowest-atk').addEventListener('click', () => setFilter('atk', 'lowest'));

// DEF filters
document.getElementById('default-def').addEventListener('click', () => setFilter('def', 'default'));
document.getElementById('highest-def').addEventListener('click', () => setFilter('def', 'highest'));
document.getElementById('lowest-def').addEventListener('click', () => setFilter('def', 'lowest'));

// Initialize
updateCharacterDisplay();