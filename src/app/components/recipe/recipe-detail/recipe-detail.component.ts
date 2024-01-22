import { Component , Input, OnInit} from '@angular/core';
import { Recipes } from '../recipes.interface';
import { RecipeService } from 'src/app/shared/recipe.service';
import { Ingredients } from 'src/app/shared/ingredients.interface';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { StorageService } from 'src/app/shared/storage.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  // user:{id:number , name:any};
  constructor( private recipeService:RecipeService , private route:ActivatedRoute , private router:Router , private storage:StorageService ){}
  // @Input() item:Recipes; // decorate the property with @Input()
  item:Recipes;
  id:number;

  ngOnInit(): void {
    const id = this.route.params.subscribe((params:Params)=>{
        this.id = +params["id"];
        this.item = this.recipeService.getRecipe(this.id);
    })
  }

  addToShopping(){
    this.recipeService.addToShoppingList(this.item.ingredient)
  }
  onEditRecipes(){
    this.router.navigate(['../' , this.id , 'edit' ] , { relativeTo: this.route })
  }
  onDeleteRecipes(){
    this.recipeService.delateRecipe(this.id);
    this.storage.storageRecipes().subscribe();
    this.router.navigate(['../'] , { relativeTo: this.route })
  }
}
