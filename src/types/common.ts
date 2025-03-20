export type localStorageObject = {
  id: string;
  title?: string | undefined;
  weight?: string | undefined;
};

export type parameters = {
  tag: string;
  textContent?: string;
  className: string[] | string;
  callback?: (event: Event) => void;
  id?: string;
  type?: string;
  name?: string;
  placeholder?: string;
  typeOfEvent?: string | "click";
  for?: string;
  value?: string | number;
  href?: string;
  download?: string;
};
