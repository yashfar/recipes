import { Component, ElementRef, ViewChild , Output , EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredients } from 'src/app/shared/ingredients.interface';
import { ShoppingListService } from 'src/app/shared/shopping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.scss']
})
export class ShoppingListEditComponent  implements OnInit , OnDestroy{
  // @ViewChild("nameInput") nameInputRef:ElementRef;
  // @ViewChild("amountInput") amountInputRef:ElementRef;
  // @Output() ingredientAdded = new EventEmitter<Ingredients>();
  @ViewChild("f") formRef:NgForm;
  editMode = false;
  editItemIndex:number;
  selectedIngredients:Ingredients;
  subscription:Subscription;
  
  constructor(private ShoppingService: ShoppingListService){}


  onAddItem(form:NgForm){
    const newIngredientAdded ={
      id: Math.floor((Math.random()*6)+1),
      name:form.value.name,
      amount:form.value.amount
    }

    if(this.editMode){  
      this.ShoppingService.updateIngredients(this.editItemIndex, newIngredientAdded);
      this.editMode=false
    }
    else{
      // this.ingredientAdded.emit(newIngredientAdded)
      this.ShoppingService.AddToList(newIngredientAdded)
      // this.ShoppingService.ingredientsopy.emit(newIngredientAdded)
    }
    form.reset()
  }
  onDeleteItem(){
    this.ShoppingService.deleteIngredients(this.editItemIndex)
    this.formRef.reset()
    this.editMode = false;
  }
  onClearItem(){
    this.formRef.reset();
    this.editMode = false;
  }

  ngOnInit(): void {
    this.subscription = this.ShoppingService.emitSelectedIngredients.subscribe(
      (index)=>{
        this.editItemIndex = index;
        this.editMode = true;
         this.selectedIngredients = this.ShoppingService.selectedIngredients(index);
         this.formRef.setValue({
          name:this.selectedIngredients.name,
          amount:this.selectedIngredients.amount
         })

      }
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
