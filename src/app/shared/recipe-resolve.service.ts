import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Recipes } from '../components/recipe/recipes.interface';
import { StorageService } from './storage.service';
import { RecipeService } from './recipe.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeResolveService implements Resolve<Recipes[]> {

  constructor(private storageService: StorageService , private recipesService:RecipeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipesService.getRecipes();

    if (recipes.length === 0) {
      return this.storageService.fetchRecipes();
    } else {
      return recipes;
    }
  }
}
