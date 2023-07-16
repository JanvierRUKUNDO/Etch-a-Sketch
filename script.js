const container = document.getElementById('container');
const newGridBtn = document.getElementById('newGridBtn');

// Function to create the grid
function createGrid(size) {
  container.innerHTML = ''; // Clear the existing grid
  container.style.width = `${size * 30}px`; // Adjust container width based on grid size

  for (let i = 0; i < size * size; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    container.appendChild(square);
  }
}

// Function to change the square color on hover
function changeColorOnHover(event) {
  const randomColor = getRandomColor();
  event.target.style.backgroundColor = randomColor;
  darkenSquare(event.target);
}

// Function to get a random RGB color
function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r},${g},${b})`;
}

// Function to darken the square by adding 10% more black to it
function darkenSquare(square) {
  const backgroundColor = square.style.backgroundColor;
  const rgbValues = backgroundColor.slice(4, -1).split(', ');
  const [r, g, b] = rgbValues.map((val) => parseInt(val, 10));

  const darknessPercentage = (10 * parseInt(square.dataset.darkness || '0', 10)) + 10;
  const newR = Math.max(r - darknessPercentage, 0);
  const newG = Math.max(g - darknessPercentage, 0);
  const newB = Math.max(b - darknessPercentage, 0);

  square.style.backgroundColor = `rgb(${newR},${newG},${newB})`;
  square.dataset.darkness = darknessPercentage / 10; // Store the darkness level in the dataset
}

// Event listener for hover effect
container.addEventListener('mouseover', changeColorOnHover);

// Event listener for the "Create New Grid" button
newGridBtn.addEventListener('click', () => {
  let gridSize = prompt('Enter the number of squares per side (max: 100):');
  gridSize = parseInt(gridSize, 10);
  
  if (isNaN(gridSize) || gridSize < 1 || gridSize > 100) {
    alert('Invalid input. Please enter a number between 1 and 100.');
    return;
  }

  createGrid(gridSize);
});