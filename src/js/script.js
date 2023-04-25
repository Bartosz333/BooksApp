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
    const e = utils.createDOMFromHTML(generatedHTML);
    // creating a DOM element from HTML code
    books.appendChild(e);
  }
}

render();
