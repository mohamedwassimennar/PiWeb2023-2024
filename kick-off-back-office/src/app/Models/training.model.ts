
export class Reser {
  _id!: string;
  date!:Date;
  time!: string;
  reservationType!: string;
  archived: boolean = false;
  players!: { nom: string, prenom: string }[];
}
export class Match {
  _id!: string;
  startDate!: Date;
   endDate!: Date;
   lieu!: string;
   archived: boolean = false;
}

export class TrainingPlan {

  _id!:string;
  trainingType!: string;
  duration!:string;
  intensityLevel!: string;
  trainingplace!:string;
  time!:string;
  date!:Date;
  archived: boolean = false;
}


  export class Meet {
    _id!: string;
    date!: Date;
    time!: string;
    meettype!:string;
    link!:string;
    archived: boolean = false;
  
  }
  

