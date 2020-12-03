import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiServiceService } from '../services/api-service.service';
import { Character } from '../services/models/character.model';
import { Comic } from '../services/models/comic.model';
@Component({
  selector: 'app-dialog-info',
  templateUrl: './dialog-info.component.html',
  styleUrls: ['./dialog-info.component.css']
})
export class DialogInfoComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any
  ,private apiService: ApiServiceService
  , public dialogRef: MatDialogRef<DialogInfoComponent>) { }
  isComic: any = 0
  pageActual: number = 1;
  character: Character = new Character()
  comic: Comic = new Comic()
  changeB: boolean = false;
  ngOnInit(): void {
    this.isComic = this.data.isComic
    this.changeB = this.data.changeButton
    if(this.isComic == 0)
    {
      this.character.name = this.data.element.name
      this.character.description = this.data.element.description
      this.character.thumbnail = this.data.element.thumbnail
      this.character.id = this.data.element.id
      this.character.comics = this.data.element.comics
      if(this.data.element.description == "")
      {
        this.character.description = "No hay una descripción asociada"
      }
    }
    else
    {
      this.comic.thumbnail = this.data.element.thumbnail
      this.comic.title = this.data.element.title
    }
  }

  addToFavourites(comic?:Comic) {
    this.dialogRef.close(comic);
  }


}
