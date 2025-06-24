const data = [
  {
    id: 1,
    title: 'The Lord of the Rings',
    publicationDate: '1954-07-29',
    author: 'J. R. R. Tolkien',
    genres: [
      'fantasy',
      'high-fantasy',
      'adventure',
      'fiction',
      'novels',
      'literature',
    ],
    hasMovieAdaptation: true,
    pages: 1216,
    translations: {
      spanish: 'El señor de los anillos',
      chinese: '魔戒',
      french: 'Le Seigneur des anneaux',
    },
    reviews: {
      goodreads: {
        rating: 4.52,
        ratingsCount: 630994,
        reviewsCount: 13417,
      },
      librarything: {
        rating: 4.53,
        ratingsCount: 47166,
        reviewsCount: 452,
      },
    },
  },
  {
    id: 2,
    title: 'The Cyberiad',
    publicationDate: '1965-01-01',
    author: 'Stanislaw Lem',
    genres: [
      'science fiction',
      'humor',
      'speculative fiction',
      'short stories',
      'fantasy',
    ],
    hasMovieAdaptation: false,
    pages: 295,
    translations: {},
    reviews: {
      goodreads: {
        rating: 4.16,
        ratingsCount: 11663,
        reviewsCount: 812,
      },
      librarything: {
        rating: 4.13,
        ratingsCount: 2434,
        reviewsCount: 0,
      },
    },
  },
  {
    id: 3,
    title: 'Dune',
    publicationDate: '1965-01-01',
    author: 'Frank Herbert',
    genres: ['science fiction', 'novel', 'adventure'],
    hasMovieAdaptation: true,
    pages: 658,
    translations: {
      spanish: '',
    },
    reviews: {
      goodreads: {
        rating: 4.25,
        ratingsCount: 1142893,
        reviewsCount: 49701,
      },
    },
  },
  {
    id: 4,
    title: "Harry Potter and the Philosopher's Stone",
    publicationDate: '1997-06-26',
    author: 'J. K. Rowling',
    genres: ['fantasy', 'adventure'],
    hasMovieAdaptation: true,
    pages: 223,
    translations: {
      spanish: 'Harry Potter y la piedra filosofal',
      korean: '해리 포터와 마법사의 돌',
      bengali: 'হ্যারি পটার এন্ড দ্য ফিলোসফার্স স্টোন',
      portuguese: 'Harry Potter e a Pedra Filosofal',
    },
    reviews: {
      goodreads: {
        rating: 4.47,
        ratingsCount: 8910059,
        reviewsCount: 140625,
      },
      librarything: {
        rating: 4.29,
        ratingsCount: 120941,
        reviewsCount: 1960,
      },
    },
  },
  {
    id: 5,
    title: 'A Game of Thrones',
    publicationDate: '1996-08-01',
    author: 'George R. R. Martin',
    genres: ['fantasy', 'high-fantasy', 'novel', 'fantasy fiction'],
    hasMovieAdaptation: true,
    pages: 835,
    translations: {
      korean: '왕좌의 게임',
      polish: 'Gra o tron',
      portuguese: 'A Guerra dos Tronos',
      spanish: 'Juego de tronos',
    },
    reviews: {
      goodreads: {
        rating: 4.44,
        ratingsCount: 2295233,
        reviewsCount: 59058,
      },
      librarything: {
        rating: 4.36,
        ratingsCount: 38358,
        reviewsCount: 1095,
      },
    },
  },
];

function getBooks() {
  return data;
}

function getBook(id) {
  return data.find((d) => d.id === id);
}

/* 
// Destructuring
const books = getBooks();
const book = getBook(1);
book;

const { title, author, genres, reviews, pages } = book;

console.log(title);
console.log(author);
console.log(genres);
console.log(reviews);

// const primaryGenre = genres[0];
// const secondaryGenre = genres[1];

const [primaryGenre, ...otherGenres] = genres;
console.log(primaryGenre);
console.log(otherGenres);

const newGenres = [...genres, 'new genre', 'another new genre'];
console.log(newGenres);

const updatedBook = {
  ...book,
  moviePublicationDate: '2001-12-19',
  pages: 1216 + 1,
};
updatedBook;

const summary = `${title} is a ${primaryGenre} book written by ${author}. It has received ${reviews.goodreads.ratingsCount} ratings on Goodreads.`;
summary;

const pagesRange =
  pages > 1000 ? 'This is a long book.' : 'This is a short book.';
pagesRange;

const pagesAllBooks = books.reduce((acc, { pages }) => {
  return acc + pages;
}, 0);
pagesAllBooks;

const x = [1, 2, 5, 4, 3];
const sorted = [...x].sort((a, b) => a - b);
console.log(sorted);
console.log(x);

const sortedByPages = [...books].sort((a, b) => a.pages - b.pages);
console.log(sortedByPages);

// 1) Add a new book to the data array
const newBook = {
  id: 6,
  title: 'Neuromancer',
  publicationDate: '1984-07-01',
  author: 'William Gibson',
  genres: ['science fiction', 'cyberpunk'],
  hasMovieAdaptation: true,
  pages: 271,
  translations: {
    spanish: 'Neuromante',
    french: 'Neuromancien',
  },
  reviews: {
    goodreads: {
      rating: 4.12,
      ratingsCount: 500000,
      reviewsCount: 10000,
    },
  },
};

const booksAfterAddingNewBook = [...books, newBook];
console.log(booksAfterAddingNewBook);

// 2) Remove a book with id 2 from the data array
const booksAfterRemovingBook = booksAfterAddingNewBook.filter(
  (book) => book.id !== 2
);
console.log(booksAfterRemovingBook);

// 3) Update the title of the book with id 1
const bookToUpdate = booksAfterRemovingBook.find((book) =>
  book.id === 1 ? { ...book, title: 'Updated Title' } : book
);
console.log(bookToUpdate);
 */

// Promises and Fetch API
// Example of using Promise with fetch
fetch(`https://jsonplaceholder.typicode.com/todos`)
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((error) => console.error('Error fetching data:', error));

// Example of using async/await
async function fetchTodos() {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const todos = await response.json();
    console.log(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
  } finally {
    console.log('Fetch attempt completed.');
  }
}
fetchTodos();
