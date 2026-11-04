import { Component, Input, OnInit } from '@angular/core';
import { Tag } from '../shared/models/tags';
import { FoodService } from '../services/food/food.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.css'
})
export class TagsComponent implements OnInit{

  @Input() foodPageTags?:string[];
  @Input() justifyContent?:string = 'center'

  tags : Tag[] = [];
  constructor(private fs:FoodService){}
  
  ngOnInit(): void {
    // if(!this.foodPageTags)
      this.tags = this.loadTags();
  }

  loadTags(): any {
    if(!this.foodPageTags){
      this.fs.getAllTags()
      .subscribe(
        (data) => {
          console.log("hhhhhh",data);
          this.tags = data;
          
        },
        (error) => {
          console.error('Error loading tags:', error);
        }
      );
    }
    
  }

}
