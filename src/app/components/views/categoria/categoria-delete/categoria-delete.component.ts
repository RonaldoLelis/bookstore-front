import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CategoriaService } from './../categoria.service';
import { Categoria } from '../models/categoria.model';

@Component({
  selector: 'app-categoria-delete',
  templateUrl: './categoria-delete.component.html',
  styleUrls: ['./categoria-delete.component.css']
})
export class CategoriaDeleteComponent implements OnInit {

  categoria: Categoria = {
    id: '',
    nome: '',
    descricao: ''
  }

  constructor(private service: CategoriaService, private getParamId: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.categoria.id = this.getParamId.snapshot.paramMap.get('id')!;
    this.getCategoryById();
  }

  getCategoryById(): void {
    this.service.findById(this.categoria.id!).subscribe((response) => {
      this.categoria = response;
    });
  }

  deleteCategory(): void {
    this.service.deleteCategory(this.categoria.id!).subscribe((response) => {
      this.router.navigate(['categorias']);
      this.service.message('Categoria deletada com sucesso!');
    }, failure => {
      this.service.message(failure.error.error);
    }
    );
  }

  cancel(): void {
    this.router.navigate(['categorias']);
  }

}
