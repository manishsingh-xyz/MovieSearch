import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeUrl, SafeResourceUrl} from "@angular/platform-browser";
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
  };
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
  loader: boolean = true;
  constructor(private itunesdataservice: ItunesdataService,
              private route: ActivatedRoute,
              private sanitizer : DomSanitizer) { }

  ngOnInit() {
    this.getFullDetails();
  }

  getFullDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.itunesdataservice.getFullData(id)
      .subscribe((res: APIresponse) => {
            this.loader = false;
            console.log(res);
            if(res){
              this.data = res;
              if(res.backdrop_path) {
                this.imagePath = 'https://image.tmdb.org/t/p/original' + res.backdrop_path;
              }
              if(res.videos.results[0].key) {
                let url = 'https://www.youtube.com/embed/' + res.videos.results[0].key;
                this.videoURL = this.sanitizer.bypassSecurityTrustResourceUrl(url);
              }
            }              
          }
      );
  }
}




