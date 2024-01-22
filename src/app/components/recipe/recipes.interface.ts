import { Ingredients } from "src/app/shared/ingredients.interface"

export interface Recipes{
    id:number,
    name:string,
    description:string,
    pathImg:string,
    ingredient:Ingredients[];
}