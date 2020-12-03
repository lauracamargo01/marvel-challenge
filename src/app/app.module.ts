import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardsComponent } from './cards/cards/cards.component';
import { NavbarComponent } from './navbar/navbar/navbar.component';
import { FavouritesComponent } from './favourites/favourites/favourites.component';
import { NgxPaginationModule} from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NullStringPipe } from '../app/customPipes/nullStringPipe.pipe';
import { DialogInfoComponent } from './dialog-info/dialog-info.component';
import { MatDialogModule } from "@angular/material/dialog";
import { SpinnerComponent } from './spinner/spinner.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { FormsModule } from '@angular/forms';
import { CarouselComponent } from './carousel/carousel.component';
@NgModule({
  declarations: [
    AppComponent,
    CardsComponent,
    NavbarComponent,
    FavouritesComponent,
    NullStringPipe,
    DialogInfoComponent,
    SpinnerComponent,
    CarouselComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FontAwesomeModule,
    FormsModule
  ],
  exports:[
    NullStringPipe
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
