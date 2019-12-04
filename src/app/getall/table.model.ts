export class Book {
  constructor(public bookCode: string, public title: string, public publisherCode: string, public type: string, public paperback: string) {}
}

export class Author {
    constructor(public authorNum: number, public authorLast: string, public authorFirst: string) {}
}

export class Copy {
    constructor(public bookCode: string, public branchNum: number, public copyNum: number, public quality: string, public price: number) {}
}

export class Publisher {
    constructor(public publisherCode: string, public publisherName: string, public city: string) {}
}

export type action = 'Modify' | 'Add'
