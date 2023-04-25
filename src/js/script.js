/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

('use strict');
// reference to template and list
const select = {
  templateOf: {
    booksProduct: '#template-book',
  },
  containerOf: {
    books: '.books-list',
  },
  imageWrapper: {
    images: '.book__image',
  },
};

const templates = {
  templateBooks: Handlebars.compile(
    document.querySelector(select.templateOf.booksProduct).innerHTML
  ),
};

const booksData = dataSource.books;

const books = document.querySelector(select.containerOf.books);
// inside the for of loop, I go through each item from dataSource.books
function render() {
  for (let book of booksData) {
    /* generating HTML code based on a template and data about a specific book. */
    const generatedHTML = templates.templateBooks({
      id: book.id,
      name: book.name,
      price: book.price,
      rating: book.rating,
      image: book.image,
    });
    /* creating a DOM element */
    const element = utils.createDOMFromHTML(generatedHTML);
    // creating a DOM element from HTML code
    books.appendChild(element);
  }
}

render();

const favoriteBooks = []; //Add an empty array

// Add the initActions function
function initActions() {
  /**In it, prepare a reference to the list of all .book__image items in the .booksList */
  const images = document.querySelectorAll(select.imageWrapper.images);

  /**Then go through each item in that list. */
  for (const image of images) {
    /**For each item in that list, add an addEventListener that will trigger a function when detected that will run... */
    image.addEventListener('dblclick', function (e) {
      e.preventDefault();//block default browser action (preventDefault)

      image.classList.toggle('favorite');//removes/adds the 'favorite' class to the clicked item (toggle)

      const dataId = image.getAttribute('data-id');//will fetch the id of the book from its 'data-id'

      favoriteBooks.push(dataId);//will add this ID to favoriteBooks[]
    });
  }
}
initActions();
