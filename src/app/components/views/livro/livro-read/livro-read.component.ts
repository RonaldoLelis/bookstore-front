import { LivroService } from './../livro.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../models/livro.model';

@Component({
  selector: 'app-livro-read',
  templateUrl: './livro-read.component.html',
  styleUrls: ['./livro-read.component.css']
})
export class LivroReadComponent implements OnInit {

  livro: Livro = {
    id: '',
    titulo: '',
    nome_autor: '',
    texto: ''
  }  
  id_cat: string = '';  
  
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
  
  cancel(): void {
    this.router.navigate([`categorias/${this.id_cat}/livros`]);
  }

}
