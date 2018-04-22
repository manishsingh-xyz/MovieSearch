import { Component, OnInit } from '@angular/core';
import { ItunesdataService } from '../itunesdata.service';


interface APIresponse {
    results: any;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

  ngOnInit() {
  }

  constructor(private itunesdataservice: ItunesdataService) { }
  searchedItem:string = '';
  selectedItem:string = 'movie';
  iData = [];
  loader: boolean = false;
  noData: boolean = false;

  items = [
    { value: 'movie', viewValue: 'Music & Movies' },
    { value: 'tv', viewValue: 'TV Shows' }
  ];

  SearchItunes(): void {
      this.iData  = [];
      this.loader = true;  
      this.noData = false;
      this.itunesdataservice.getData(this.searchedItem,this.selectedItem)
            .subscribe((res: APIresponse) => {
                this.loader = false;
                if(res.results.length === 0){
                  this.noData = true;
                }                 
                this.iData = res.results;
                console.log("movie",this.iData);
            });
  } 
}
