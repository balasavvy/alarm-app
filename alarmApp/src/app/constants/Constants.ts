import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Constants {

  constructor() { }

    readonly quotesAPIUrl: string = 'http://quotes.rest/qod?category';
}