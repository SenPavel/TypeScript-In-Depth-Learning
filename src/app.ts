import { Library, RefBook, RefernceItem, UniversityLabrarian } from './classes';
import Encyclopedia from './classes/encyclopedia';
import Shelf from './classes/shelf';
import { Category } from './enums';
import { bookTitleTransform, calcTotalPages, checkoutBooks, createCustomer, createCustomerId, getAllBooks, getBookAuthorByIndex, getBookById, getBookProp, getBooksByCategory, getBooksByCategoryPromise, getBookTitlesByCategory, getTitles, logBookTitles, logCategorySearch, logFirstAvailable, logSearchResults, printBook, purge } from './functions';
import { Author, Book, Librarian, Logger, Magazine } from './interfaces';
import { BookRequiredFields, CreateCustomerFunctionType, PersonBook, UpdatedBook } from './types';

showHello('greeting', 'TypeScript');

function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt.innerText = `Hello from ${name}`;
}


// Task 02.01
logFirstAvailable(getAllBooks());
logBookTitles(getBookTitlesByCategory(Category.JavaScript));
console.log(getBookAuthorByIndex(0));
console.log(calcTotalPages());


// Task 03.01
const myID: string = createCustomerId('Ann', 10);
console.log(myID);
let idGenerator: (name: string, id: number) => string;
idGenerator = (name: string, id: number) => `${id}-${name}`;
idGenerator = createCustomerId;
console.log(idGenerator('Anna', 20));

// Task 03.02
createCustomer('Anna', 30, 'Kyiv');
logFirstAvailable();
logBookTitles(getBookTitlesByCategory());
console.log(getBookById(1));
checkoutBooks('Anna', 1, 3, 10);

//Task 03.03
console.log(getTitles(1, true));
const checkOutBooks = getTitles(false);
console.log(checkOutBooks);

//Task 03.04
let result = bookTitleTransform('JavaScript');
console.log(result);

// Task 04.01
const myBook: Book = {
    id: 5,
    title: 'Colors, Backgrounds, and Gradients',
    author: 'Eric A. Meyer',
    available: true,
    category: Category.CSS,
    pages: 200,
    markDamaged: (reason: string) => `Damaged: ${reason}`
};
printBook(myBook);
myBook.markDamaged('Missing back cover');

// Task 04.02
const logDamage: Logger = (reason: string) => `Damaged: ${reason}`;
console.log(logDamage('missing back cover'));

//Task 04.03
const favoriteAuthor: Author = {
    email: 'anna@example.com',
    name: 'Anna',
    numBooksPublished: 3
}

const favouriteLabrarian: Librarian = {
    name: 'Anna',
    email: 'anna@example.com',
    department: 'Classical Literature',
    assistCustomer: (custName: string) => console.log(custName)
}

console.log(favoriteAuthor)
console.log(favouriteLabrarian)

// Task 04.04
const offer: any = {};
console.log(offer.magazine);
console.log(offer.magazine?.getTitle());
// console.log(offer?.getTitle());

//Task 04.05
const mySecondBook: Book = {
    id: 5,
    title: 'Colors, Backgrounds, and Gradients',
    author: 'Eric A. Meyer',
    available: true,
    category: Category.CSS,
    pages: 200,
    markDamaged: (reason: string) => `Damaged: ${reason}`
};
console.log(getBookProp(mySecondBook, 'title'))
console.log(getBookProp(mySecondBook, 'markDamaged'));
console.log(getBookProp(mySecondBook, 'isbn'));

//Task 05.01
// const ref: RefernceItem = new RefernceItem(1, 'TypeScript', 2020);
// ref.printItem();
// ref.publisher = 'Random Publisher';
// console.log(ref.publisher);
// console.log(ref);
// console.log(ref.getId())

// Task 05.02
const refBook = new Encyclopedia(1, 'TypeScript', 2020, 3);
console.log(refBook);
refBook.printItem();
refBook.printCitation();

// Task 05.03
const secondRefBook = new Encyclopedia(1, 'TypeScript', 2020, 3);
console.log(secondRefBook);
refBook.printCitation();

// Task 05.04
const secondFavouriteLabrarian: Librarian = new UniversityLabrarian();
secondFavouriteLabrarian.name = 'Anna';
secondFavouriteLabrarian.assistCustomer('Petr')


//Task 05.05
const personBook: PersonBook = {
    name: 'Anna',
    email: 'anna@example.com',
    author: 'Boris',
    available: false,
    category: Category.TypeScript,
    id: 1,
    title: 'Mastering of TypeScript',
    markDamaged: null,
    pages: 400
};
console.log(personBook);

// Task 06.05
import('./classes')
    .then(module => {
        const reader = new module.Reader();
        reader.name = 'Anna';
        reader.take(getAllBooks()[0]);
        console.log(reader);
    });

let lib: Library = {
    id: 1,
    name: 'Anny',
    address: 'Kyiv'
};
console.log(lib);

// Task 06.06
const library: Library = {
    id: 1,
    name: 'Anna',
    address: 'Minsk'
};
console.log(library);

// Task 07.01
const inventory: Book[] = [
    { id: 10, title: 'The C Programming Language', author: 'K & R', available: true, category: Category.Software },
    { id: 11, title: 'Code Complete', author: 'Steve McConnell', available: true, category: Category.Software },
    { id: 12, title: '8-Bit Graphics with Cobol', author: 'A. B.', available: true, category: Category.Software },
    { id: 13, title: 'Cool autoexec.bat Scripts!', author: 'C. D.', available: true, category: Category.Software }
];
const purgeResult = purge(inventory);
console.log(purgeResult);
const numbers: number[] = [
    1, 2, 3, 4, 5
];
console.log(purge(numbers));

//Task 07.02, Task 07.03
const bookShelf: Shelf<Book> = new Shelf<Book>();
inventory.forEach(book => bookShelf.add(book));
console.log(bookShelf.getFirst().title);

const magazines: Magazine[] = [
    { title: 'Programming Language Monthly', publisher: 'Code Mags' },
    { title: 'Literary Fiction Quarterly', publisher: 'College Press' },
    { title: 'Five Points', publisher: 'GSU' }
]
const magazineShelf = new Shelf<Magazine>();
magazines.forEach(mag => magazineShelf.add(mag));
console.log(magazineShelf.getFirst().title);
console.log(magazineShelf.find('Five Points'));

// Task 07.04
const obj: BookRequiredFields = {
    id: 1,
    author: 'Anna',
    available: false,
    category: Category.CSS,
    markDamaged: null,
    pages: 100,
    title: 'Unknown'
};

const updatedBook: UpdatedBook = {
    id: 1,
    title: 'Anna'
};

const params: Parameters<CreateCustomerFunctionType> = ['Anna', 30];
createCustomer(...params);

// Task 08.01
const p = new UniversityLabrarian();
console.log(p);


// Task 08.02
const fLibrarian = new UniversityLabrarian();
fLibrarian.name = 'Anna';
fLibrarian['printLibrarian']();

//Task 08.03
const o = new UniversityLabrarian();
o.assistFactulty = null;
// o.teachCommunity = null;

//Task 08.04
const enc = new RefBook(1, 'No Title', 2020, 3);
enc.printItem();

//Task 08.05, 08.06
const oU = new UniversityLabrarian();
oU.name = 'Anna';
console.log(oU);
oU.assistCustomer('Boris');

//Task 08.07
const encBook = new RefBook(1, 'New Title', 2020, 3);
encBook.copies = 10;
// encBook.copies = -4;

//Task 09.01
console.log('Begin of getting books by category');
getBooksByCategory(Category.JavaScript, logCategorySearch);
getBooksByCategory(Category.Software, logCategorySearch);
console.log('End of getting books by category');

//Task 09.02
console.log('Begin of getting books by category with Promise');
getBooksByCategoryPromise(Category.JavaScript).then(books => {
    console.log(books);
    return books.length;
}).catch(error => {
    console.log(error);
})

getBooksByCategoryPromise(Category.Software).then(books => {
    console.log(books);
    return books.length;
}).catch(error => {
    console.log(error);
})
console.log('End of getting books by category with Promise');

//Task 09.03
console.log('Begin of logging books by category with Promise');
logSearchResults(Category.JavaScript);
logSearchResults(Category.Software).catch(err => console.log(err));
console.log('End of logging books by category with Promise');