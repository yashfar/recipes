import { Injectable , EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Ingredients } from 'src/app/shared/ingredients.interface';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientCopy = new Subject<Ingredients[]>();
  emitSelectedIngredients = new Subject<number>(); 
  constructor(private router:Router) { }
  ingredients:Ingredients[] =[
    {
      id:1,
      name:"Apple",
      amount:10,
    },
    {
      id:2,
      name:"Benana",
      amount:2,
    }
  ] 
  AddToList(item){
    this.ingredients.push(item)
    this.ingredientCopy.next(this.ingredients.slice())
  }
  addToshoppingList(ingredients:Ingredients[]){
  //this is true but happend more than usual happend 
    // for(let ingredient of ingredients ){
    //   this.AddToList(ingredient);
    // }
    this.ingredients.push(...ingredients)
    this.ingredientCopy.next(this.ingredients.slice())
    this.router.navigate(["/shopping-list"])
  }

  selectedIngredients(index :number){
    return this.ingredients[index]
  }
  updateIngredients(index:number , ingrd:Ingredients){
    this.ingredients[index] = ingrd;
    this.ingredientCopy.next(this.ingredients.slice())
  }
  deleteIngredients(index:number){
    this.ingredients.splice(index , 1 );
    this.ingredientCopy.next(this.ingredients.slice())
  }

}
