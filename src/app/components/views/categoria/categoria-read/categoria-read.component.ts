import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CategoriaService } from '../categoria.service';
import { Categoria } from '../models/categoria.model';

@Component({
  selector: 'app-categoria-read',
  templateUrl: './categoria-read.component.html',
  styleUrls: ['./categoria-read.component.css']
})
export class CategoriaReadComponent implements OnInit {

  categorias: Categoria[] = [];
  displayedColumns: string[] = ['id', 'nome', 'descricao', 'livros', 'acoes'];

  constructor(
    private service: CategoriaService,
    private router: Router) { }

  ngOnInit(): void {
    this.findAllCategories();
  }

  findAllCategories() {
    this.service.findAll().subscribe(result => {
      this.categorias = result;
    });
  }

  openCreateCategory() {
    this.router.navigate(["categorias/create"]);
  }

}
