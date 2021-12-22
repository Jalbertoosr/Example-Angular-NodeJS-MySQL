/*import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
}*/

/*import { Injectable } from '@angular/core';
@Injectable({
providedIn: 'root'
})
export class AuthService {
constructor() { }
getUserDetails() {
return localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : null;
}
setDataInLocalStorage(variableName, data) {
localStorage.setItem(variableName, data);
}
getToken() {
return localStorage.getItem('token');
}
clearStorage() {
localStorage.clear();
}
}*/

import { Injectable } from "@angular/core";
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor() { }
  getUserDetails() {
  //return localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : null;
  return localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')!) : null;
  }
  setDataInLocalStorage(variableName: string, data: string) {
  localStorage.setItem(variableName, data);
  }
  getToken() {
    return localStorage.getItem('token');
  }

  clearStorage() {
    localStorage.clear();
  }
}
