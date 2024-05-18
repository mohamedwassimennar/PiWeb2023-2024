// my-league.model.ts
export class MyLeague {
    _id!: string;
    date!: Date;
    opponent!: string;
    venue!: string;
    team!: string;
    fixtureType!: string;
    matchStatus!: string;
    score!: string;
    image!: string;
    archived: boolean = false; // Add archived property

}