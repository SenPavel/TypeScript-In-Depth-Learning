import { ShelfItem } from '../interfaces';

export default class Shelf<T extends ShelfItem> {
    private items: Array<T> = [];

    add(item: T) {
        this.items.push(item);
    }

    getFirst(): T {
        return this.items[0];
    }

    find(title: string): T {
        return this.items.find(x => x.title === title);
    }

    printTitles(): void {
        this.items.forEach(item => console.log(item.title));
    }
}