import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipes } from '../components/recipe/recipes.interface'
import { RecipeService } from './recipe.service';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private http: HttpClient , private recipeService:RecipeService , private authService:AuthService) {}

  storageRecipes(){
    const recipes = this.recipeService.getRecipes() 
    return this.http.put('https://recipe-book-8bce2-default-rtdb.firebaseio.com/recipes.json' , recipes)
  }

  fetchRecipes(){
      return this.http.get<Recipes[]>('https://recipe-book-8bce2-default-rtdb.firebaseio.com/recipes.json').pipe(
        map((res)=>{
          const postsArray:Recipes[] = []
          for(let key in res){
            postsArray.push({...res[key] , ingredient: res[key].ingredient ? res[key].ingredient :[] })
          }
          return postsArray;
        }), tap(recipes =>{
          this.recipeService.setRecipes(recipes);
        })
      )
  }
  
     
}
