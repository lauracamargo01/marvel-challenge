import { Component, Input, SimpleChanges } from '@angular/core';
import { Comic } from './services/models/comic.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  favourite: any
  favouritesList: Comic[] = []
  title = 'marvel-challenge';
  deletedComic: Comic = new Comic()
  value: any
  ngOnChanges(changes: SimpleChanges) {
    if(changes.favourite.currentValue !=changes.favourite.previousValue  )
    {
      console.log(changes.favourite.currentValue)
    }
  }

  sendFavourite(event:any)
  {
    this.favourite = event
  }

  sendDeletedComic(deletedComic:any)
  {
    this.deletedComic = deletedComic
  }

  sendFilterValue(value:any)
  {
    this.value = value
  }
}
