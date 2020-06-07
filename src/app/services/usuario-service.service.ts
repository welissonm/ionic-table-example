import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';

import { Observable, of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceService {

  private readonly usuarios: Usuario[];
  constructor() {
    this.usuarios = [
      {
        matricula: 1,
        nome: 'Francisco',
        cargo: 'Gerente'
      },
      {
        matricula: 2,
        nome: 'Maria',
        cargo: 'CEO'
      },
    ];
  }

  private findIndex(u: Usuario): Observable<number>{
    const index = this.usuarios.findIndex(
      _u=> _u.matricula == u.matricula || _u.nome.toLowerCase() == u.nome.toLowerCase()
    );
    return of(index);
  }

  find(u: Usuario): Observable<Usuario>{
    const index = this.usuarios.findIndex(
      _u=> _u.matricula == u.matricula || _u.nome.toLowerCase() == u.nome.toLowerCase()
    );
    if (index >= 0){
      return of(this.usuarios[index]);
    }
    return of(null);
  }

  getAll(): Observable<Usuario[]>
  {
    return of(this.usuarios);
  }

  save(u: Usuario): Observable<void>{
    return this.findIndex(u)
    .pipe(
      switchMap( (index) => {
        if (index >= 0){
          this.usuarios[index] = u;
        } else {
          this.usuarios.push(u);
        }
        return of(null);
      })
    );
  }

  deleteByMatricula(matricula: number): Observable<number>{
    const index = this.usuarios.findIndex(
      _u=> _u.matricula == matricula
    );
    if (index >= 0){
      this.usuarios.splice(index, 1);
    }
    return of(index);
  }

  delete(u: Usuario): Observable<number>{
    return this.findIndex(u)
    .pipe(
      map( index => {
        if (index >= 0){
          this.usuarios.splice(index, 1);
        }
        return index;
      })
    );
  }
}
