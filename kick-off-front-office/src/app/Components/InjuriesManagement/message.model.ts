// message.model.ts
export interface Message {
    message?: string;
    sender?: string;
    recipient?: string; // Ajoutez le champ recipient
    date?: Date;
  }
  