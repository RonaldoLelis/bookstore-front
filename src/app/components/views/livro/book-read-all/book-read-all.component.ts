import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from '../../categoria/categoria.service';
import { LivroService } from '../livro.service';
import { Livro } from '../models/livro.model';

@Component({
  selector: 'app-book-read-all',
  templateUrl: './book-read-all.component.html',
  styleUrls: ['./book-read-all.component.css']
})
export class BookReadAllComponent implements OnInit {
  
  livros: Livro[] = [];
  id_cat: string = '';
  titleCategory: string = '';
  displayedColumns: string[] = ['id', 'titulo', 'livros', 'acoes'];

  constructor(
    private serviceLivro: LivroService,
    private serviceCategoria: CategoriaService,
    private getParamId: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.id_cat = this.getParamId.snapshot.paramMap.get('id_cat')!;
    this.findAllBooks();
    this.serviceCategoria.findAll().subscribe(result => {
      for (let item of result) {
        if(this.id_cat == item.id) {
          this.titleCategory = item.nome;
        }
      }
    });
  }

  findAllBooks(): void {
    this.serviceLivro.findAllByCategory(this.id_cat).subscribe((response) => {
      this.livros = response;
    });
  }

  openCreateBook(): void {
    this.router.navigate([`categorias/${this.id_cat}/livros/create`]);
  }

}
