import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from './models/categoria.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  baseUrl: string = environment.baseUrl;

  constructor(private httpClient: HttpClient, private _snack: MatSnackBar) { }

  findAll(): Observable<Categoria[]> {
    const url = `${this.baseUrl}/categorias`;
    return this.httpClient.get<Categoria[]>(url);
  }

  findById(id: string):Observable<Categoria> {
    const url = `${this.baseUrl}/categorias/${id}`;
    return this.httpClient.get<Categoria>(url);
  }

  createCategory(categoria: Categoria): Observable<Categoria> {
    const url = `${this.baseUrl}/categorias`
    return this.httpClient.post<Categoria>(url, categoria);
  }

  editCategory(categoria: Categoria): Observable<void> {
    const url = `${this.baseUrl}/categorias/${categoria.id}`
    return this.httpClient.put<void>(url, categoria);
  }

  deleteCategory(id: string): Observable<void> {
    const url = `${this.baseUrl}/categorias/${id}`;
    return this.httpClient.delete<void>(url);
  }

  message(str: string) {
    this._snack.open(`${str}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    });
  }
}
