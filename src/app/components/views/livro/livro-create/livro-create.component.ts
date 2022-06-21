import { LivroService } from './../livro.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../models/livro.model';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-livro-create',
  templateUrl: './livro-create.component.html',
  styleUrls: ['./livro-create.component.css']
})
export class LivroCreateComponent implements OnInit {

  livro: Livro = {
      id: '',
      titulo: '',
      nome_autor: '',
      texto: ''
  }

  id_cat: string = '';  
  titulo = new FormControl('', [Validators.minLength(5), Validators.required]);
  nome_autor = new FormControl('', [Validators.minLength(5), Validators.required]);
  texto = new FormControl('', [Validators.minLength(10), Validators.required]);

  constructor(private serviceLivro: LivroService, private router: Router, private getParamId: ActivatedRoute) { }

  ngOnInit(): void {
    this.id_cat = this.getParamId.snapshot.paramMap.get('id_cat')!;
  }

  createBook(): void {
    this.serviceLivro.createBook(this.livro, this.id_cat).subscribe((response) => {
      this.router.navigate([`categorias/${this.id_cat}/livros`]);
      this.serviceLivro.message('Livro criado com sucesso!');
    }, failure => {
      for(let err = 0; err < failure.error.errors.length; err++) {
        this.serviceLivro.message(failure.error.errors[err].message);          
      }
    }); 
  }

  getMessage() {
    if(this.titulo.invalid) {
      return 'O campo Título deve conter entre 5 e 100 caracteres!';
    }
    if(this.nome_autor.invalid) {
      return 'O campo Nome do Autor deve conter entre 5 e 100 caracteres!';
    }
    if(this.texto.invalid) {
      return 'O campo Texto deve conter entre 10 e 1000000 caracteres!';
    }
  }

  cancel(): void {
    this.router.navigate([`categorias/${this.id_cat}/livros`]);
  }

}
