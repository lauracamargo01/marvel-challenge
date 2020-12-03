import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { Comic } from 'src/app/services/models/comic.model';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {
  @Input() favouriteComic: any
  @Output() deletedComic = new EventEmitter()
  comicsList: Comic[] = [];
  pageActual: number = 1;
  totalItems:number = 0;
  constructor(private apiService: ApiServiceService) { }


  ngOnInit(): void {
    //this.getComicList();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.favouriteComic.currentValue !=changes.favouriteComic.previousValue  )
    {
      let forDelete = false
      for (let i=0;i<this.comicsList.length;i++) {
        if (this.comicsList[i].title == changes.favouriteComic.currentValue.title) {
          forDelete = true
          this.comicsList.splice(i, 1);
          break
        }
      }
      if(!forDelete)
      {
        this.comicsList.push(changes.favouriteComic.currentValue)
      }

    }
    this.totalItems = this.comicsList.length
  }

  deleteComic(comic:any)
  {
    for (let i=0;i<this.comicsList.length;i++) {
      if (this.comicsList[i].title == comic.title) {
        this.comicsList.splice(i, 1);
        break
      }
    }
    this.totalItems = this.comicsList.length
    this.deletedComic.emit(comic)
  }

}
