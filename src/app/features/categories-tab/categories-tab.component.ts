import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { PostsService } from '../../core/services/posts.service';
import { CategoriesComponent } from '../../components/categories/categories.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../core/model/categories.model';

@Component({
  selector: 'blog-categories-tab',
  standalone: true,
  imports: [CommonModule, CategoriesComponent],
  templateUrl: './categories-tab.component.html',
  styleUrl: './categories-tab.component.scss'
})
export class CategoriesTabComponent {
  categories$: Observable<Category[]> = this.postsService.getCategories();
  selectedCategory$ = this.activatedRoute.paramMap.pipe(map((params) => params.get('cat') as Category));

  constructor(
    private postsService: PostsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  navigate(selected: string | string[]) {
    this.router.navigate(['category', selected]);
  }
}
