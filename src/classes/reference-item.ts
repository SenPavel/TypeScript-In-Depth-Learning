import { timeout } from "../decorators";

export abstract class RefernceItem {
    private _publisher: string;
    #id: number;
    static department: string = 'Classical Literature';

    constructor(id: number, public title: string, protected year: number) {
        console.log('Creating a new ReferenceItem');
        this.#id = id;
    }

    get publisher(): string {
        return this._publisher.toUpperCase();
    }

    set publisher(newPublisher) {
        this._publisher = newPublisher;
    }

    getId(): number {
        return this.#id;
    }

    @timeout(2000)
    printItem(): void {
        console.log(`${this.title} was published in ${this.year}`);
        console.log(`Department: ${RefernceItem.department}`);
    }

    abstract printCitation();
}