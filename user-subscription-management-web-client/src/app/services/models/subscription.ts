export interface Subscription {
    id: number;
    title?: string;
    key?: string;
    description?: string;
    duration: number;
    price: number;
    isChecked: boolean;
  }
  