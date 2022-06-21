import { LivroService } from './../livro.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../models/livro.model';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-livro-update',
  templateUrl: './livro-update.component.html',
  styleUrls: ['./livro-update.component.css']
})
export class LivroUpdateComponent implements OnInit {

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

  constructor(private service: LivroService, private router: Router, private getParamId: ActivatedRoute) { }

  ngOnInit(): void {
    this.id_cat = this.getParamId.snapshot.paramMap.get('id_cat')!;
    this.livro.id = this.getParamId.snapshot.paramMap.get('id')!;
    this.getBookById();
  }

  getBookById() {
    this.service.findById(this.livro.id!).subscribe((response) => {
      this.livro = response;
    });
  }

  editBook(): void {
    this.service.editBook(this.livro).subscribe((response) => {
      this.router.navigate([`categorias/${this.id_cat}/livros`]);
      this.service.message('Livro atualizado com sucesso!');
    }, error => {
      this.router.navigate([`categorias/${this.id_cat}/livros`]);
      this.service.message('Falha ao atualizar dados do Livro!');
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
