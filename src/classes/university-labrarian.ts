import { format, logger, logMethod, logParameter, sealed, writable } from '../decorators';
import * as Interfaces from '../interfaces';

// @sealed('UniversityLibrarian')
@logger
class UniversityLabrarian implements Interfaces.Librarian {
    @format()
    name: string;
    email: string;
    department: string;

    @logMethod
    assistCustomer(@logParameter custName: string) {
        console.log(`${this.name} is assisting ${custName}`);
    }

    @writable(true)
    assistFactulty(): void {
        console.log('Assisting faculty');
    }

    @writable(false)
    teachCommunity(): void {
        console.log('Teaching community');
    }
}

export { UniversityLabrarian };