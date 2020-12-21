import { Category } from "./enums";
import { Book, LibMgrCallback } from "./interfaces";
import { BookOrUndefined, BookProperties } from "./types";

export function getAllBooks(): ReadonlyArray<Book> {
    const books = <const>[
        { id: 1, category: Category.JavaScript, title: 'Refactoring JavaScript', author: 'Evan Burchard', available: true },
        { id: 2, category: Category.JavaScript, title: 'JavaScript Testing', author: 'Liang Yuxian Eugene', available: false },
        { id: 3, category: Category.CSS, title: 'CSS Secrets', author: 'Lea Verou', available: true },
        { id: 4, category: Category.JavaScript, title: 'Mastering JavaScript Object-Oriented Programming', author: 'Andrea Chiarelli', available: true }
    ];
    return books;
}


export function logFirstAvailable(books: readonly Book[] = getAllBooks()): void {
    const numberOfBooks = books.length;
    const bookName = books.find(x => x.available).title;

    console.log(`Number of Books: ${numberOfBooks}`);
    console.log(`Name of first available Book ${bookName}`);
}

export function getBookTitlesByCategory(category: Category = Category.JavaScript): Array<string> {
    const books = getAllBooks();
    return books.filter(book => book.category === category)
        .map(book => book.title);
}

export function logBookTitles(titles: Array<string>): void {
    titles.forEach(title => console.log(title));
}

export function getBookAuthorByIndex(index: number): [string, string] {
    const books = getAllBooks();
    const { title, author } = books[index];
    return [title, author];
}

export function calcTotalPages(): bigint {
    const data = <const>[
        { lib: 'libName1', books: 1_000_000_000, avgPagesPerBook: 250 },
        { lib: 'libName2', books: 5_000_000_000, avgPagesPerBook: 300 },
        { lib: 'libName3', books: 3_000_000_000, avgPagesPerBook: 280 }
    ];

    return data.reduce((acc, lib) => {
        return acc + BigInt(lib.books * lib.avgPagesPerBook);
    }, 0n)
}



export function createCustomerId(name: string, id: number): string {
    return `${id}-${name}`;
}

export function createCustomer(name: string, age?: number, city?: string) {
    console.log(`Custome Name: ${name}`);

    if (age) {
        console.log(`Customer Age: ${age}`);
    }

    if (city) {
        console.log(`Customer city: ${city}`);
    }
}

export function getBookById(id: number): BookOrUndefined {
    const books = getAllBooks();
    return books.find(book => book.id === id);
}

export function checkoutBooks(customer: string, ...booksIds: number[]): string[] {
    console.log(`Customer Name: ${customer}`);
    const titles: string[] = [];

    booksIds.forEach(id => {
        const book = getBookById(id);

        if (book?.available) {
            titles.push(book.title);
        }
    });

    return titles;
}

export function getTitles(author: string): string[];
export function getTitles(available: boolean): string[];
export function getTitles(id: number, available: boolean): string[];

export function getTitles(...args: (string | boolean | number)[]): string[] {

    const books = getAllBooks() as any[];

    if (args.length === 1) {
        const [arg] = args;

        if (typeof arg === 'string') {
            return books.filter(book => book.author === arg).map(book => book.title);
        } else if (typeof arg === 'boolean') {
            return books.filter(book => book.available === arg).map(book => book.available);
        }
    } else if (args.length === 2) {
        const [id, available] = args;

        if (typeof id === 'number' && typeof available === 'boolean') {
            return books.filter(book => book.id === id && book.available === available)
                .map(book => book.title);
        }
    }
}

export function assertStringValue(value: any): asserts value is string {
    if (typeof value !== 'string') {
        throw new Error('value should have been a string')
    }
}

export function bookTitleTransform(title: any): string | never {
    assertStringValue(title);

    return [...title].reverse().join('');
}

export function printBook(book: Book): void {
    console.log(`${book.title} by ${book.author}`);
}

export function getBookProp(book: Book, prop: BookProperties): any {
    if (typeof book[prop] === 'function') {
        return book[prop]['name'];
    }
    return book[prop];
}

export function purge<T>(inventory: Array<T>): Array<T> {
    return inventory.slice(2);
}

export function getBooksByCategory(category: Category, callback: LibMgrCallback): void {
    setTimeout(() => {
        try {
            const books = getBookTitlesByCategory(category);
            if (books.length > 0) {
                callback(null, books);
            } else {
                throw new Error('No books found');
            }
        } catch (error) {
            callback(error, null);
        }
    }, 2000);
}

export function logCategorySearch(err: Error, titles: Array<string>): void {
    if (err) {
        console.log(`Error message: ${err.message}`);
    } else {
        console.log(titles);
    }
}

export function getBooksByCategoryPromise(category: Category): Promise<Array<string>> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const books = getBookTitlesByCategory(category);
            if (books.length > 0) {
                resolve(books);
            } else {
                reject('No books found');
            }
        }, 2000);
    })
}

export async function logSearchResults(category: Category) {
    const result = await getBooksByCategoryPromise(category);
    console.log(result);
}