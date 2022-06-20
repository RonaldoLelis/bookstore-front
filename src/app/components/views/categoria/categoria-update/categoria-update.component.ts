import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from '../categoria.service';
import { Categoria } from '../models/categoria.model';

@Component({
  selector: 'app-categoria-update',
  templateUrl: './categoria-update.component.html',
  styleUrls: ['./categoria-update.component.css']
})
export class CategoriaUpdateComponent implements OnInit {

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

  editCategory(): void {
    this.service.editCategory(this.categoria).subscribe((response) => {
      this.router.navigate(['categorias']);
      this.service.message('Categoria editada com sucesso!');
    }, error => {
      this.service.message('Não é permitido campos vazios!');
    }
    );
  }

  cancel(): void {
    this.router.navigate(['categorias']);
  }

}
