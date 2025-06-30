import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {
    @Input() selectedTab : any
    @Input() data : any
    @Input() breadCrumb: any
    @Input() searchTerm: string = '';
    @Output() selectedTabs = new EventEmitter<string>()
    @Output() searchTermChange = new EventEmitter<string>()
    @Input() hideSearchBar = false;

  selectTab(tab: any) {
    this.selectedTab = tab;
    this.selectedTabs.emit(tab)
  }

  onSearchChange(value: string) {
    this.searchTerm = value;
    this.searchTermChange.emit(value);
  }
}
