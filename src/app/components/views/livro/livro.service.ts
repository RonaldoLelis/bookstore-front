import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { Livro } from './models/livro.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  baseUrl: string = environment.baseUrl;

  constructor(private httpClient: HttpClient, private _snack: MatSnackBar) { }

  findAllByCategory(id_cat: string): Observable<Livro[]> {
    const url = `${this.baseUrl}/livros?categoria=${id_cat}`;
    return this.httpClient.get<Livro[]>(url);
  }

  findById(id: string): Observable<Livro> {
    const url = `${this.baseUrl}/livros/${id}`;
    return this.httpClient.get<Livro>(url);
  }

  createBook(livro: Livro, id_cat: string): Observable<Livro> {
    const url = `${this.baseUrl}/livros?categoria=${id_cat}`;
    return this.httpClient.post<Livro>(url, livro);
  }

  editBook(livro: Livro): Observable<Livro> {
    const url = `${this.baseUrl}/livros/${livro.id}`;
    return this.httpClient.put<Livro>(url, livro);
  }

  message(str: string) {
    this._snack.open(`${str}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    });
  }
}
