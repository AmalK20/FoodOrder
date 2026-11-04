import { Component, OnInit } from '@angular/core';
import { Food } from '../shared/models/food';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from '../services/food/food.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-foodpage',
  templateUrl: './foodpage.component.html',
  styleUrl: './foodpage.component.css',
})
export class FoodpageComponent implements OnInit {
  food!: Food| undefined;
  selectedRating: number = 0;


  constructor(private activatedRoute: ActivatedRoute, private router:Router, private fs: FoodService, private cartService:CartService) {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.fs.getFoodById(params['id']).subscribe(
          (food) => {
            // Assign the food when the observable emits a value
            this.food = food;
            this.selectedRating = food?.star || 0;
            console.log("foodPage",food);
          },
          (error) => {
            console.error('Error fetching food:', error);
          }
        );
      }
      
    });
  }
  ngOnInit(): void {}

  onRatingChange(rating: number): void {
    if (this.food) {
      this.food.star = rating;
      // Save the updated food item in your service or backend
      // Example: this.foodService.updateFood(this.food);
    }
  }

  addToCart(){
    if(this.food){
      console.log("to the cart",this.food);
      this.cartService.addToCart(this.food);
      this.router.navigateByUrl('cart-page');
    }
  }
}
