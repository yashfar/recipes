import { Component , OnInit} from '@angular/core';
import { Ingredients } from 'src/app/shared/ingredients.interface';
import { ShoppingListService } from 'src/app/shared/shopping-list.service';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {
  constructor(private ShoppingService: ShoppingListService){}
  ingredients:Ingredients[];

  // onAddtoList(item:Ingredients){
    
  // }
  ngOnInit(): void {
    this.ingredients = this.ShoppingService.ingredients.slice();//slice means copy of data 
    this.ShoppingService.ingredientCopy.subscribe((ingredients:Ingredients[])=>{
    this.ingredients = ingredients
    // console.log(this.ingredients)
    })
  }

  onEditItem(index:number){
    this.ShoppingService.emitSelectedIngredients.next(index);
  }
}
