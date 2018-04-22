import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeUrl, SafeResourceUrl} from "@angular/platform-browser";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { ItunesdataService } from '../itunesdata.service';


interface APIresponse {
    backdrop_path: string;
    videos: {
    results: [
      {
        key: string,
        name: string      
      }
    ] 
  }
}

@Component({
  selector: 'app-moviedetail',
  templateUrl: './moviedetail.component.html',
  styleUrls: ['./moviedetail.component.css']
})
export class MoviedetailComponent implements OnInit {
  data;
  imagePath;
  videoURL: SafeUrl;
  title = 'Movies Search ';
  poster: string;
  releaseDate: any;
  overview: string;
  animal: string;
  name: string;


  constructor(private itunesdataservice: ItunesdataService,
              private route: ActivatedRoute,
              private sanitizer : DomSanitizer,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.getFullDetails();
  }

  getFullDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.itunesdataservice.getFullData(id)
      .subscribe((res: APIresponse) => {
            console.log(res);
            this.data = res; 
            this.imagePath = 'https://image.tmdb.org/t/p/original'+res.backdrop_path;
            let url = 'https://www.youtube.com/embed/'+res.videos.results[0].key;
            this.videoURL =  this.sanitizer.bypassSecurityTrustResourceUrl(url);
          }
      );
  }

  // openDialog(): void {
  //   let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
  //     width: '250px',
  //     data: { name: this.name, animal: this.animal }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     this.animal = result;
  //   });
  // }
}

// @Component({
//   selector: 'dialog-overview-example-dialog',
//   templateUrl: 'dialog-overview-example-dialog.html',
// })
// export class DialogOverviewExampleDialog {

//   constructor(
//     public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
//     @Inject(MAT_DIALOG_DATA) public data: any) { }

//   onNoClick(): void {
//     this.dialogRef.close();
//   }

// }



