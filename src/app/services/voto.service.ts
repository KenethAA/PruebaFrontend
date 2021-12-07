import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Voto, VotoWithoutID } from '../models/voto';
import { environment } from 'src/environments/environment';

const API= environment.urlBackend;
const ENDPOINT = 'votacions';

@Injectable({
  providedIn: 'root'
})
export class VotoService {

  constructor(
    private http: HttpClient
  ) { }
 //GET
  getAllVoto(){
    return this.http.get<Voto[]>(`${API}/${ENDPOINT}`)
  }

  //POST
  postVoto(Voto:VotoWithoutID){
    return this.http.post(`${API}/${ENDPOINT}`,Voto);
  }

  //PUT
  putVoto(id:string,Voto:VotoWithoutID){
    return this.http.put(`${API}/${ENDPOINT}/${id}`,Voto)
  }

  //PATCH
  patchVoto(id:string,Voto:VotoWithoutID){
    return this.http.patch(`${API}/${ENDPOINT}/${id}`,Voto)
  }

  //DELETE
deleteVoto(id:string){
    return this.http.delete(`${API}/${ENDPOINT}/${id}`)
  }
}