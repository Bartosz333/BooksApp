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
      filters: '.filters',
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
      thisBooks.filters = [];
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
          details: book.details.adults,
          nonFiction: book.details.nonFiction,
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

      /**Add a listener that waits for the clicked item (event.target), paying attention to its parent (offsetParent)*/
      thisBooks.bookContainer.addEventListener('dblclick', function (e) {
        e.preventDefault(); //block default browser action (preventDefault)
        const image = e.target.offsetParent;

        const dataId = image.getAttribute('data-id');

        if (!thisBooks.favoriteBooks.includes(dataId)) {
          image.classList.add('favorite'); //removes/adds the 'favorite' class
          thisBooks.favoriteBooks.push(dataId); //will add this ID to favoriteBooks[]
        } else {
          const indexOfBooks = thisBooks.favoriteBooks.indexOf(dataId); //download index
          thisBooks.favoriteBooks.splice(indexOfBooks, 1); //remove id
          image.classList.remove('favorite'); //removes/adds the 'favorite' class
        }
      });

      const booksFilter = document.querySelector(select.containerOf.filters);

      booksFilter.addEventListener('click', function (cb) {
        const clickedElement = cb.target;

        if (
          clickedElement.tagName == 'INPUT' &&
          clickedElement.type == 'checkbox' &&
          clickedElement.name == 'filter'
        ) {
          console.log('clickedElement', clickedElement.valuebooksFilter);

          if (clickedElement.checked) {
            thisBooks.filters.push(clickedElement.value);
          } else {
            const indexOfValue = thisBooks.filters.indexOf(
              clickedElement.value
            );
            thisBooks.filters.splice(indexOfValue, 1);
          }
        }
        
      });
    }
  }
  new Books();
}
