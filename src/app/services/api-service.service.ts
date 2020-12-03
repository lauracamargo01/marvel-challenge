import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Md5 } from 'md5-typescript';
import { Observable } from 'rxjs';
import { Character } from './models/character.model';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  private baseUrl = "https://gateway.marvel.com:443/";
  private publicKey = "b82a3240534418d7d2d521adafd8140a";
  private privKey = "701b179f176194905441f2077ba112614c89dd7f"
  private date = new Date()
  private ts = this.date.getTime();
  stringToHash = this.ts+this.privKey+this.publicKey
  hash = Md5.init(this.stringToHash)
  authentication = "ts="+this.ts+"&apikey="+this.publicKey+"&hash="+this.hash;

  constructor(private http: HttpClient) { }

  getCharacterList(orderBy?:any,filter?:any): Observable<any>
  {
    let parametro = `?limit=45&${this.authentication}`

    if((filter && orderBy) != "" && (filter && orderBy) != undefined)
    {
      parametro = `?nameStartsWith=${filter}&orderBy=${orderBy}&limit=45&${this.authentication}`
    }
    else if(orderBy!=undefined && orderBy!="")
    {
      parametro = `?orderBy=${orderBy}&limit=45&${this.authentication}`
    }else if(filter!=undefined && filter!="")
    {
      parametro = `?nameStartsWith=${filter}&limit=45&${this.authentication}`
    }


    return this.http.get<any>(`${this.baseUrl}v1/public/characters${parametro}`);
  }

  getCharacterById(characterId: number): Observable<any>
  {
    return this.http.get<any>(this.baseUrl+'v1/public/characters/'+characterId+"?"+this.authentication);
  }

  getCharacterComicsById(characterId: number): Observable<any>
  {
    return this.http.get<any>(this.baseUrl+'v1/public/characters/'+characterId+'/comics?'+this.authentication);
  }

  getComicList(): Observable<any>
  {
    return this.http.get<any>(this.baseUrl+'v1/public/comics?'+this.authentication);
  }
}
