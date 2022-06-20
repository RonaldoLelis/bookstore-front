import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CategoriaService } from './../categoria.service';
import { Categoria } from '../models/categoria.model';

@Component({
  selector: 'app-categoria-create',
  templateUrl: './categoria-create.component.html',
  styleUrls: ['./categoria-create.component.css']
})


export class CategoriaCreateComponent implements OnInit {

  categoria: Categoria = {
    nome: '',
    descricao: ''
  }

  constructor(private service: CategoriaService, private router: Router) { }

  ngOnInit(): void { }

  createCategory(): void {
    this.service.createCategory(this.categoria).subscribe((response) => {
      this.router.navigate(['categorias']);
      this.service.message('Categoria criada com sucesso!');
    }, failure => {
      for(let err = 0; err < failure.error.errors.length; err++) {
        this.service.message(failure.error.errors[err].message);          
      }
    }); 
  }

  cancel(): void {
    this.router.navigate(['categorias']);
  }

}
