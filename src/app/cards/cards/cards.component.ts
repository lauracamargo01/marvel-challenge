import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { DialogInfoComponent } from 'src/app/dialog-info/dialog-info.component';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { Character } from 'src/app/services/models/character.model';
import { Comic } from 'src/app/services/models/comic.model';
import { MatDialog } from "@angular/material/dialog";
import { Overlay } from '@angular/cdk/overlay';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  @Output() favouriteComic = new EventEmitter()
  @Input() forDelete: any
  @Input() filterValue: any
  characterList: Character[] =  []
  comicsGeneralList: any[] = []
  comicsCharacterList: any[] = [];
  pageActual: number = 1;
  mostrarInformacion: boolean = false;
  showSpinner: boolean = true;
  favouritesList: Comic[] = []
  totalItems: number = 0
  characterListCopy: Character[] = []
  constructor(
    private apiService: ApiServiceService
    , public dialog: MatDialog
    , public overlay: Overlay
    , private cdRef: ChangeDetectorRef
  ) { }


  ngOnInit(): void {
    this.getCharacterList("");
  }

  agregarAlArreglo()
  {
    let ini = this.characterList['data']['results']
    ini.forEach((element: any) => {
      let newCharacter: Character = new Character()
      newCharacter.name = element.name
      newCharacter.description = element.description
      newCharacter.thumbnail = element.thumbnail.path + "." + element.thumbnail.extension
      newCharacter.id = element.id
      newCharacter.description = element.description
      this.characterListCopy.push(newCharacter)
      //this.getCharacterComicsById(newCharacter)
    });
  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes.forDelete) {
      if (changes.forDelete.currentValue != changes.forDelete.previousValue) {
        for (let i = 0; i < this.favouritesList.length; i++) {
          if (this.favouritesList[i].title == changes.forDelete.currentValue.title) {
            this.favouritesList.splice(i, 1);
            break
          }
        }
      }
    }
    if (changes.filterValue) {
      if (!changes.filterValue.firstChange) {
        if (changes.filterValue.currentValue != changes.filterValue.previousValue) {
          // nameStartsWith
          this.getCharacterList("", changes.filterValue.currentValue)
        }
      }

    }

  }

  onChangeSelect(event: any) {
    this.characterList = []
    this.getCharacterList(event.target.value);
  }

  getCharacterList(orderBy?: any, filter?: any) {
    let listado: any = []
    this.characterList = []
    this.characterListCopy = []
    this.apiService.getCharacterList(orderBy, filter).subscribe(
      res => {
        let rta = res['data']['results'];
        this.totalItems = rta.length
        rta.forEach((element: any) => {
          let newCharacter: Character = new Character()
          newCharacter.name = element.name
          newCharacter.description = element.description
          newCharacter.thumbnail = element.thumbnail.path + "." + element.thumbnail.extension
          newCharacter.id = element.id
          newCharacter.description = element.description
          // borrar
          //this.characterListCopy.push(newCharacter)
          this.getCharacterComicsById(newCharacter)

        });
        this.showSpinner = false
      }

    )

  }

  getCharacterById(characterId: number): any {
    let respuesta = ""
    this.apiService.getCharacterById(characterId).subscribe(
      res => {
        respuesta = res
      });
    return respuesta
  }

  getCharacterComicsById(newCharacter: Character) {
    this.apiService.getCharacterComicsById(newCharacter.id).subscribe(
      res => {
        let rta = res['data']['results'];
        let listaComics: any[] = []
        rta.forEach((element: any) => {
          let newComic: Comic = new Comic()
          newComic.id = element.id
          newComic.title = element.title
          newComic.thumbnail = element.thumbnail.path + "." + element.thumbnail.extension
          listaComics.push(newComic);
        });
        newCharacter.comics = []
        newCharacter.comics = listaComics
        if (newCharacter.description == "") {
          newCharacter.description = "No hay una descripción asociada"
        }
        this.characterList.push(newCharacter);
        //this.cdRef.detectChanges();
      }

    )

  }

  openDialogFilter(val: MouseEvent, id: any, isComic: any, element: any): void {
    // let character = this.getCharacterById(id)
    val.stopPropagation();
    let widthModal = 900;
    let heightModal = 550;
    let changeButton = false;
    if (isComic == 1) {
      for (let item of this.favouritesList) {
        if (item.title == element.title) {
          changeButton = true;
          break
        }
      }
    }
    const dialogRef = this.dialog.open(DialogInfoComponent, {
      disableClose: false,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      width: widthModal.toString() + "px",
      height: (heightModal).toString() + "px",
      backdropClass: 'for-dialog-class',
      position: {
        top: (widthModal / 12).toString() + 'px',
        left: (widthModal / 3).toString() + 'px'
      },
      data: {
        id: id,
        isComic: isComic,
        element: element,
        changeButton: changeButton
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (!changeButton) {
          this.favouritesList.push(result)
        }
        else {

          for (let i = 0; i < this.favouritesList.length; i++) {
            if (this.favouritesList[i].title == element.title) {
              this.favouritesList.splice(i, 1);
              break
            }
          }
        }
        this.favouriteComic.emit(result)
      }
    });
  }
}
