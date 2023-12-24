export interface ValidationProblemDetails {
    type?: string;
    title?: string;
    status?: number;
    detail?: string;
    instance?: string;
    errors?: { [key: string]: string[] };
  }
  