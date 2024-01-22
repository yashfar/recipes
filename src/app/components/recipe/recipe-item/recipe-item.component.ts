import { Component, Input, Output, EventEmitter} from '@angular/core';
import { Recipes } from '../recipes.interface';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent {
  @Input() recipe:Recipes;
}
