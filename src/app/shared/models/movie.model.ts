export interface Movie {
    id: string;
    title: string;
    popularity: string;
    image: MovieImage;
    slug: string;
    runtime: string;
    released: string;
    genres: string[];
    budget: number;
  }
  
  
  export interface MovieImage {
    url: string;
    title: string;
  }
  