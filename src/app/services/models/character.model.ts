import { Comic } from './comic.model'
import { Thumbnail } from './thumbnail.model'

export class Character{
  id: number = 0
  name: string = ""
  description: string = ""
  modified: string = ""
  resourceURI:string = ""
  thumbnail:string = ""
  comics: Comic[]= [];
}
