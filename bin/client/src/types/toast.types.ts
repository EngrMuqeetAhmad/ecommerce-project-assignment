export interface ToastTypes {
  message: string;
  isOpen: boolean;
  setIsOpen: any;
  type: TYPE;
}

export enum TYPE {
  SUCCESS = 'success',
  ERROR = 'error',
}
