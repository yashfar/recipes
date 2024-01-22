import { Component, OnInit } from '@angular/core';
import { Recipes } from '../recipes.interface';
import { RecipeService } from 'src/app/shared/recipe.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit{
  constructor(private recipeService:RecipeService){}

  emitedRecipe:Recipes
  // emitedRecipeItem(newItem:Recipes){
  //   this.emitedRecipe = newItem
  // }
  ngOnInit(): void {
    // this.recipeService.recipeItem.subscribe(
    //   (recipe:Recipes) =>{
    //       this.emitedRecipe = recipe;
    //   })
  }
}
