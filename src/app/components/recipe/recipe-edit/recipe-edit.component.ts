import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgxPhotoEditorService } from 'ngx-photo-editor';
import { RecipeService } from 'src/app/shared/recipe.service';
import { StorageService } from 'src/app/shared/storage.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  id:number;
  editMode=false;
  recipeForm:FormGroup;
  outputImage?: string;
  // formatedImage:File
   
  constructor(private route:ActivatedRoute, private router:Router , private recipeService:RecipeService , private storageService:StorageService , private imageEditorService: NgxPhotoEditorService){}
 
  ngOnInit(): void {
     this.route.params.subscribe(
      (params:Params)=>{
          this.id= params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
      })
  }
  private initForm(){
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngrredient = new FormArray([])

    if(this.editMode){
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.pathImg;
      recipeDescription =recipe.description;
      
      if(recipe['ingredient']){
        for(let ingredient of recipe.ingredient){
          // console.log(ingredient);
          recipeIngrredient.push(
            new FormGroup({
              'name': new FormControl(ingredient.name),
              'amount': new FormControl(ingredient.amount)
            }) 
          )
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName),
      'pathImg' : new FormControl(recipeImagePath),
      'description' : new FormControl(recipeDescription),
      'ingredient': recipeIngrredient
    })

  }

  onSubmit(){
    // console.log(this.recipeForm);
    if(this.editMode){
      this.recipeService.editSelectedREcipe(this.id , this.recipeForm.value)
    }else{
      this.recipeForm.value.pathImg = this.outputImage
      this.recipeService.addNewRecipe( this.recipeForm.value)
    }
    this.storageService.storageRecipes().subscribe();
    this.router.navigate(['../'] , { relativeTo: this.route })
  }

  addIngredient(){
    (<FormArray>this.recipeForm.get('ingredient')).push(
      new FormGroup({
        'name': new FormControl(),
        'amount': new FormControl(1),
      })
    );
  }
  delateIngredient(index:number){
    (<FormArray>this.recipeForm.get('ingredient')).removeAt(index);
  }

  onCancel(){
    this.router.navigate(['../'] , { relativeTo: this.route })
  }

  fileChangeHandler($event: Event) :void{
    this.imageEditorService.open($event, {
      aspectRatio: 4 / 3,
      autoCropArea: 1
    }).subscribe(data => {
      this.outputImage = data.base64;
      // this.formatedImage = data.file;
      // let fileReader = new FileReader();
      //   fileReader.readAsDataURL(this.formatedImage);
      //   fileReader.addEventListener(
      //   "loadend",
      //   ev => {
      //     let readableString = fileReader.result.toString();
      //   }
      //   );
        this.recipeForm.value.pathImg = this.outputImage
    });
  }

}
