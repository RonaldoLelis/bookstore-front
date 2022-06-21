import { LivroDeleteComponent } from './components/views/livro/livro-delete/livro-delete.component';
import { LivroUpdateComponent } from './components/views/livro/livro-update/livro-update.component';
import { LivroCreateComponent } from './components/views/livro/livro-create/livro-create.component';
import { CategoriaUpdateComponent } from './components/views/categoria/categoria-update/categoria-update.component';
import { CategoriaDeleteComponent } from './components/views/categoria/categoria-delete/categoria-delete.component';
import { CategoriaCreateComponent } from './components/views/categoria/categoria-create/categoria-create.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriaReadComponent } from './components/views/categoria/categoria-read/categoria-read.component';
import { HomeComponent } from './components/views/home/home.component';
import { BookReadAllComponent } from './components/views/livro/book-read-all/book-read-all.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'categorias',
    component: CategoriaReadComponent
  },
  {
    path: 'categorias/create',
    component: CategoriaCreateComponent
  },
  {
    path: 'categorias/delete/:id',
    component: CategoriaDeleteComponent
  },
  {
    path: 'categorias/update/:id',
    component: CategoriaUpdateComponent
  },
  {
    path: 'categorias/:id_cat/livros',
    component: BookReadAllComponent
  },
  {
    path: 'categorias/:id_cat/livros/create',
    component: LivroCreateComponent
  },
  {
    path: 'categorias/:id_cat/livros/:id/update',
    component: LivroUpdateComponent
  },
  {
    path: 'categorias/:id_cat/livros/:id/delete',
    component: LivroDeleteComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
