import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Ingredients } from '../shared/ingredients.model';

import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducer'

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit ,OnDestroy{

  ingredients:Observable<{ingredients:Ingredients[]}> ;
  private igChangedSub:Subscription

  constructor(private store:Store<fromApp.AppState>) { }

  ngOnInit(){
    this.ingredients=this.store.select('shoppingList');
    /* this.ingredients=this.slService.getIngredients();
    this.igChangedSub=this.slService.ingredientsChanged.subscribe((ingredients:Ingredients[])=>{
      this.ingredients=ingredients;
    }); */
  }

  ngOnDestroy(){
    /* this.igChangedSub.unsubscribe(); */
  }

  onEditItem(index:number){
    /* this.slService.startedEditing.next(index); */
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }

}
