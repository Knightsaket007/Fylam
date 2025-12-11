declare global {
  interface AIField {
    id: string;
    label: string;
    type: 'text' | 'number' | 'date' | 'select';
    required: boolean;
    suggestedValue?: string;
  }

  // interface AIForm {
  //   id: string;
  //   title: string;
  //   fields: AIField[];
  //   sourcePdfUrl?: string;
  //   filledPdfUrl?: string;
  //   country: string;
  // }

  // mke it dynamic

  interface AppUser {
    id: string;
    email: string;
    name?: string;
  }
}

export {};
