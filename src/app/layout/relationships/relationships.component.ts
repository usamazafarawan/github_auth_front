import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { entities } from "../../../solution.json";

@Component({
  selector: 'app-relationships',
  imports: [CommonModule, FormsModule],
  templateUrl: './relationships.component.html',
  styleUrl: './relationships.component.scss'
})
export class RelationshipsComponent implements OnInit {
  @Output() cancel = new EventEmitter<void>();
  
  priorities: any
  strength:any
  selectStrength1: any
  selectstrength2:any
  selectconfidence:any
  selectPriority:any
  accordionData:any
  tabs:any
  
  ngOnInit(): void {
    this.priorities = entities.goal.views.card.priorities;
    this.strength = entities.goal.views.card.strength;
    this.tabs = entities.goal.views.card.Relationshiptabs
    this.accordionData = entities.goal.views.card.accordionData;
    this.selectStrength1 = this.priorities[1]?.code; 
    this.selectstrength2 = this.strength[0]?.code; 
    this.selectconfidence = this.priorities[1]?.code; 
    this.selectPriority = this.priorities[1]?.code; 
  }

  toggleAccordion(index: number): void {
    this.accordionData[index].isOpen = !this.accordionData[index].isOpen;
  }

  onCancel() {
    this.cancel.emit();
  } 
  
  activeTab: string = 'select';
}
