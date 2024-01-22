import { Component, OnInit, Output , EventEmitter} from '@angular/core';
import { Recipes } from '../recipes.interface';
import { RecipeService } from 'src/app/shared/recipe.service';
import { Subscription } from 'rxjs';
import { StorageService } from 'src/app/shared/storage.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit  {
  constructor(private recipeService:RecipeService , private storageService:StorageService){}
  recipes:Recipes[];
  subscription: Subscription;
  
  ngOnInit(): void {
    this.storageService.fetchRecipes().subscribe()
    
    this.subscription = this.recipeService.recipesChanged.subscribe(
      (recipes: Recipes[]) => { 
        this.recipes = recipes;
      }
    );

    
  }
  


  // emitRecipeItem(value:Recipes){
  //   this.recipeService.recipeItem.emit(value);
  // }
  


}
