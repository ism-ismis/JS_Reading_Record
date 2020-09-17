const addedTitle = document.getElementById('title');
const addedAuthor = document.getElementById('author');
const addedGrade = document.getElementById('grade');
const addedDate = document.getElementById('date');

// const titleEl = document.getElementById('book-title');
// const authorEl = document.getElementById('book-author');
// const gradeEl = document.getElementById('book-grade');
// const dateEl = document.getElementById('book-date');

const addBtn = document.getElementById('add-btn');
const submitBtn = document.getElementById('submit-btn');
const closeBtn = document.getElementById('close-btn');
const deleteBtns = document.querySelectorAll('delete-btn');

const addPage = document.getElementById('addBook-container');
const cards = document.getElementById('cards')


// Store card data
const booksData = getBooksData();

// Store DOM books data
const booksEl = [];

// Get bookcards from local storage
function getBooksData() {
  const bookCards = JSON.parse(localStorage.getItem('book cards'));
  return bookCards === null ? [] : bookCards;
}

// Set bookcards to local storage
function setBooksData(cards) {
  localStorage.setItem('book cards', JSON.stringify(cards))
  
}

// Delete a card data
function deleteData(e) {
  const clickedNumber = e.target.id;
  booksData.splice(clickedNumber, 1);
  showAllCards();
  
} 

// Create a new card
function showAllCards() {
  
    cards.innerHTML = booksData.map((card,index) => `
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">${card.title}<button type="button" class="btn btn-dark btn-sm delete-btn" id="${index}">X</button></h5>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">${card.author}</li>
        <li class="list-group-item">${card.grade}</li>
        <li class="list-group-item">${card.date}</li>
      </ul>
    </div>
    `).join(''); 

    const deleteBtns = document.querySelectorAll('.delete-btn');
    deleteBtns.forEach(btn => {
      btn.addEventListener('click', deleteData);
    })
}

// Toggle add page
function openAddPage() {
  addPage.classList.add('show');
}

function closeAddPage() {
  addPage.classList.remove('show');
}

function makeStar(num) {
  const stars = [];
  for(let i=0; i<num; i++){
    stars.push("⭐️");
  }
  return stars.join("");
}

function submitBookData() {
  const title = addedTitle.value;
  const author = addedAuthor.value;
  const grade = makeStar(addedGrade.value);
  const date = addedDate.value;
  
  const newCard = {title, author, grade, date};
  
  booksData.push(newCard);
  setBooksData(booksData);

  showAllCards();
}

function deleteCard(e){
  const elementClicked = e.target;
  console.log(elementClicked);
}

showAllCards();

// Event Listeners
addBtn.addEventListener('click', openAddPage);
closeBtn.addEventListener('click', closeAddPage);
submitBtn.addEventListener('click', submitBookData);
