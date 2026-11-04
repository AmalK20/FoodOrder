import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Import AngularFirestore correctly
import { Observable } from 'rxjs';
import { Food } from '../../shared/models/food';
import { map, tap } from 'rxjs/operators';
import { Tag } from '../../shared/models/tags';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
    constructor(private store: AngularFirestore) {}

    getFoodById(id: string): Observable<Food | undefined> {
      console.log(this.store
        .collection<Food>('/foods') // Change 'foods' to your actual Firestore collection name
        .doc<Food>(id)
        .valueChanges())
      return this.store
        .collection<Food>('/foods') // Change 'foods' to your actual Firestore collection name
        .doc<Food>(id)
        .valueChanges();
    }


  getFood(): Observable<Food[]> {
    console.log("it works",this.store.collection('/foods').valueChanges())
    return this.store.collection('/foods').valueChanges() as Observable<Food[]>;
  }

  getFoodByTag(tag : string) : Observable<Food[]>{
    if(tag === 'All'){
    return this.getFood() ;
    }
    else{
    return this.getFood().pipe(map((foods: Food[]) => foods.filter(food => food.tags?.includes(tag)))) 
    }
  }

  getAllTags(): Observable<Tag[]>{
    return this.getFood().pipe(
      map((foods: Food[]) => {
        const tagCounts: Tag[] = [];
        tagCounts.push({name:'All',count:foods.length})

        // Iterate through each food item
        foods.forEach((food) => {
          // Iterate through tags of each food item
          if (food.tags) {
            food.tags.forEach((tag) => {
              const existingTagCount = tagCounts.find((tc) => tc.name === tag);

              if (existingTagCount) {
                existingTagCount.count++;
              } else {
                tagCounts.push({ name :tag, count: 1 });
              }
            });
          }
        });
        
        return tagCounts;
      })
    );
  }
  


  // getAll(): string[]{
  //   return[
  //     '/assets/pngegg.png',
  //     '/assets/pngegg (1).png',
  //     '/assets/pngegg (2).png',
  //     '/assets/pngegg (3).png',
  //     '/assets/pngegg (4).png',
  //     '/assets/pngegg (5).png',
  //   ]
  // }
}


