import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingListComponent } from './components/shopping/shopping-list/shopping-list.component';
import { RecipeComponent } from './components/recipe/recipe/recipe.component';
import { RecipeStartComponent } from './components/recipe/recipe-start/recipe-start.component';
import { AuthGaord } from './auth/auth/auth.gaurd';
import { RecipeEditComponent } from './components/recipe/recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './components/recipe/recipe-detail/recipe-detail.component';
import { RecipeResolveService } from './shared/recipe-resolve.service';
import { AuthComponent } from './auth/auth/auth.component';

const routes: Routes = [ 
  {path:'' , redirectTo:"/recipes" , pathMatch: 'full' },
  {path:'shopping-list' , component:ShoppingListComponent },
  {path:'recipes' , component:RecipeComponent, canActivate:[AuthGaord] , children:[
    {path:'' , component:RecipeStartComponent },
    {path:'new' , component:RecipeEditComponent },
    {path:':id' , component:RecipeDetailComponent, resolve:[RecipeResolveService] },
    {path:':id/edit' , component:RecipeEditComponent , resolve:[RecipeResolveService] },
  ] },
  {path:'recipes/:id/:name' , component:RecipeComponent },
  {path:'auth' , component:AuthComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
