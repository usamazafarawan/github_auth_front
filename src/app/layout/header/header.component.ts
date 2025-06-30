import { Component, OnInit, OnDestroy,  Renderer2, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

 

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  title: any
  version:any
  createdDate:any
  owner:any
  company:any
  viewControl = new FormControl('Default View');

  // ngOnInit(): void {
  //  this.title = header.title
  //  this.version = header.version
  //  this.createdDate = header.createdDate
  //  this.owner = header.owner
  //  this.company = header.company
  // }
 // Track dropdown visibility state
  isMultiDropdownOpen: boolean = false;
  isDoubleDropdownOpen: boolean = false;

  // Toggle MultiLevel Dropdown
  toggleMultiDropdown(): void {
    this.isMultiDropdownOpen = !this.isMultiDropdownOpen;
  }

  // Toggle DoubleDropdown
  toggleDoubleDropdown(): void {
    this.isDoubleDropdownOpen = !this.isDoubleDropdownOpen;
  }

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    // Wait until the view is fully initialized to manipulate the DOM
    const button = document.getElementById('dropdownAvatarNameButton');
    const dropdown = document.getElementById('dropdownAvatarName');
    
    if (button && dropdown) {
      // Attach a click event to toggle the dropdown visibility
      this.renderer.listen(button, 'click', () => {
        dropdown.classList.toggle('hidden');
      });
    }
  }
  

}