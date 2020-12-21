import { Category } from "./enums";

interface Book {
    id: number;
    category: Category;
    title: string;
    author: string;
    available: boolean;
    pages?: number;
    markDamaged?: DamageLogger;
}

interface Person {
    name: string;
    email: string;
}

interface Author extends Person {
    numBooksPublished: number;
}

interface Librarian extends Person {
    department: string;
    assistCustomer: (custName: string) => void;
}

interface DamageLogger {
    (reason: string): void;
}

interface Magazine {
    title: string;
    publisher: string;
}

interface ShelfItem {
    title: string;
}

interface LibMgrCallback {
    (err: Error, titles: Array<string>): void;
}

export { Book, DamageLogger as Logger, Person, Author, Librarian, Magazine, ShelfItem, LibMgrCallback }