export type uploadApiProps = {
  name: string;
  description: string | null;
  steps: {};
  ingredients: {};
  image: File | null;
};

export type recipe = {
  id: number;
  user_id: number;
  image: string;
  ingredients: { [key: string]: string };
  steps: { [key: string]: string };
  overview: string;
  name: string;
};

export type recipePage = {
  data: recipe[];
  has_next: boolean;
  has_previous: boolean;
  num_pages: number;
  current_page: number;
};

export type recipeBook = {
  id: number;
  user_id: number;
  name: string;
  description: string;
  recipes: recipe[];
};

export type recipeBookUpload = {
  name: string;
  description: string;
  recipes: number[];
};
