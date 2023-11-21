import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from '../../../components/logo/logo.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { SwitchMediaDirective } from '../../utils/switch-media.directive';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';


@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    CommonModule,
    LogoComponent,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    RouterModule,
    MatSidenavModule,
    SwitchMediaDirective,
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
  menuOpen = false;
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
