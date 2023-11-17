import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostGridComponent } from './post-grid/post-grid.component';
import { RouterModule } from '@angular/router';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDividerModule} from '@angular/material/divider';
import { PostItemComponent } from '../../components/post-item/post-item.component';
import { PostUrlPipe } from '../../core/utils/post-url.pipe';
import { PostFeaturedComponent } from '../../components/post-featured/post-featured.component';
import { EngineeringContentComponent } from './engineering-content/engineering-content.component';
import { CategoriesComponent } from '../../components/categories/categories.component';
import { JobsComponent } from '../../components/jobs/jobs.component';



@NgModule({
  declarations: [PostGridComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: PostGridComponent }]),
    MatPaginatorModule,
    MatDividerModule,
    PostItemComponent,
    PostFeaturedComponent,
    EngineeringContentComponent,
    CategoriesComponent,
    JobsComponent,
    PostUrlPipe,
  ]
})
export class HomeModule { }
