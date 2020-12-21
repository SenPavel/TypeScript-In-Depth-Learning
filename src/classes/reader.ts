import { Book } from "../interfaces";

export class Reader {
    name: string;
    books: Array<Book> = [];

    take(book: Book): void {
        this.books.push(book);
    }
}