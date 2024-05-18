export class Reser {
  _id!: string;
  date!: Date;
  time!: string;
  reservationType!: string;
  players!: { nom: string, prenom: string }[];
}
