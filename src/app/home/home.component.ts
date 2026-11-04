import { Component, Input, OnInit } from '@angular/core';
import { FoodService } from '../services/food/food.service';
import { Food } from '../shared/models/food';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  stars: number[] = Array(5).fill(0).map((_, i) => i + 1);
  foods :Food[] = [];
  constructor(private fs:FoodService,private route:ActivatedRoute){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['searchItem']) {
        this.fs.getFood().subscribe((foods: Food[]) => {
          this.foods = foods.filter(food => 
            food.name.toLowerCase().includes(params['searchItem'].toLowerCase())
          );
        });
      } 
      else if (params['tag']){
        this.fs.getFoodByTag(params['tag']).subscribe(
          (filteredFoods: Food[]) => {
            this.foods = filteredFoods;
          }, 
          err => console.log('Error filtering by tag')
        )} 
      else {
        this.loadFoods();
      }
    });
  }

  rateFood(food: Food, rating: number) {
    // Update the rating of the selected product
    food.star = rating;
  }

  loadFoods(): void {
    this.fs.getFood()
    .subscribe(
      (data) => {
        console.log("hhhhhh",data);
        this.foods = data;
        
      },
      (error) => {
        console.error('Error loading foods:', error);
      }
    );
  }


}
