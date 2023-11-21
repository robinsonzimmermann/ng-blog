import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipListboxChange, MatChipsModule } from '@angular/material/chips';


@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, MatChipsModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  @Input() categories!: string[];
  @Output() selected = new EventEmitter<string[]>();

  onChange(event: MatChipListboxChange) {
    const selected: string[] = event.value ?? [];
    this.selected.emit(selected.map((value) => value.toLowerCase()));
  }
}
