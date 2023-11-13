import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostGridComponent } from './post-grid/post-grid.component';
import { RouterModule } from '@angular/router';
import {MatPaginatorModule} from '@angular/material/paginator';
import { PostItemComponent } from '../../components/post-item/post-item.component';
import { PostUrlPipe } from '../../core/utils/post-url.pipe';



@NgModule({
  declarations: [PostGridComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: PostGridComponent }]),
    MatPaginatorModule,
    PostItemComponent,
    PostUrlPipe,
  ]
})
export class HomeModule { }
