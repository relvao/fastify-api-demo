export interface Property {
  id: string;
  title: string;
  url: string;
  city: string;
  picture: {
    url: string;
    title: string;
  }

  [key: string]: any;
}
