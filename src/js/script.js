/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars
{
  ('use strict');
  const select = {
    templateOf: {
      booksProduct: '#template-book',
    },
    containerOf: {
      books: '.books-list',
      images: '.book__image',
    },
  };
  // reference to template and list
  const templates = {
    templateBooks: Handlebars.compile(
      document.querySelector(select.templateOf.booksProduct).innerHTML
    ),
  };
  class Books {
    constructor() {
      const thisBooks = this;

      thisBooks.initData();
      thisBooks.getElement();
      thisBooks.render();
      thisBooks.initActions();
    }

    initData() {
      const thisBooks = this;

      thisBooks.booksData = dataSource.books;
      thisBooks.favoriteBooks = []; //Add an empty array
    }

    getElement() {
      const thisBooks = this;

      thisBooks.bookContainer = document.querySelector(
        select.containerOf.books
      );
    }
    // inside the for of loop, I go through each item from dataSource.books
    render() {
      const thisBooks = this;

      for (let book of thisBooks.booksData) {
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
        thisBooks.bookContainer.appendChild(element);
      }
    }

    // Add the initActions function
    initActions() {
      const thisBooks = this;

      /**For each item in that list, add an addEventListener that will trigger a function when detected that will run... */
      thisBooks.bookContainer.addEventListener('dblclick', function (e) {
        e.preventDefault(); //block default browser action (preventDefault)

        const image = e.target.offsetParent;/**is just a reference to the element that participated in the event! That is, for the dblClick of the element that was clicked! */
        const dataId = image.getAttribute('data-id');

        if (!thisBooks.favoriteBooks.includes(dataId)) {
          image.classList.add('favorite'); //removes/adds the 'favorite' class to the clicked item
          thisBooks.favoriteBooks.push(dataId); //will add this ID to favoriteBooks[]
        } else {
          const indexOfBooks = thisBooks.favoriteBooks.indexOf(dataId);
          thisBooks.favoriteBooks.splice(indexOfBooks, 1);
          image.classList.remove('favorite');//removes/adds the 'favorite' class to the clicked item
        }
      });
    }
  }
  new Books();
}
