export type recipe = {
    name: string,   
}

export type recipeTab = {
    name: string,
    rating: number,
}

export type recipeTabProps = {
    recipe: recipeTab,
}

export type stepInputProps = {
    step: string;
    stepNum: number;
    setStep: (value: string) => void;
}

export type ingredientInputProps = {
    ingredient: string;
    ingredientNum: number;
    setIngredient: (value: string) => void;
}

export type uploadApiProps = {
    name: string;
    description: string | null;
    steps: string;
    ingredients: string;
    image: File | null;
}