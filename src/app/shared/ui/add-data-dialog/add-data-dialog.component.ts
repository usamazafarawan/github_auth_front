import { CommonModule, DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { discover } from "../../../../data.json"
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogModelComponent } from '../../../models/entity';
import { DiscoverPageType } from '../../../models/common.enum';
import { Router } from '@angular/router';
import { entities } from '../../../../solution.json'
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
declare const Datepicker: any;

interface ConceptType {
  type: string;
  description: string;
}

@Component({
  selector: 'app-add-data-dialog',
  imports: [CommonModule, FormsModule, MatDatepickerModule,ReactiveFormsModule,MatNativeDateModule],
  templateUrl: './add-data-dialog.component.html',
  styleUrl: './add-data-dialog.component.scss',
  providers: [DatePipe]

})
export class AddDataDialogComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<AddDataDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogModelComponent,
    private router: Router,
    private datePipe: DatePipe,
    private fb: FormBuilder
  ) { }
  showSelectionScreen = true;
  activeTab: 'create' | 'add' = 'create';
  searchQuery: string = '';
  selectedConceptType: string | null = null;

  SelectconceptTypes: ConceptType[] = discover.SelectconceptTypes

  FindconceptTypes: ConceptType[] = discover.FindconceptTypes

  filteredConceptTypes: ConceptType[] = [...this.SelectconceptTypes];

  organizationData: any[] =  entities.goal.views.Organizational.modelJson.nodeDataArray.slice(0, 6);

  viewType: string = '';
  discoverPageType = DiscoverPageType;
  tableTabs: ConceptType[] = discover.tableTabs
  tableSelectedTab: string = '';
  dropdownOwner = false;
  dropdownPriority = false;
  dropdownStatus = false;
  selectedStatus: any;
  selectedOwners: any;
  selectedPriority: any;
  owners: any;
  priorities: any;
  taskName: string = '';
  dueDate: Date = new Date();
  componentData: any;
  graphActiveTab: string = 'add_node';
  statuses: any[] = [
    {
      "name": "Active",
      "code": "1",
      "color": "#DEF7EC"
    },
    {
      "name": "statuses",
      "code": "2",
      "color": "#EBF5FF"
    },
  ]

  // Node Graph 
  graphNodeForm: FormGroup | any;
  NodeLinkForm: FormGroup | any;

  // TimeLine
  timeLineForm!: FormGroup | any;

  // organization Form
  organizationForm!: FormGroup| any;


  // Board cards
  boardCardForm: FormGroup | any;
  boardCategories: any[] = [
    {
      "priorityColor": "bg-green-100 text-green-500",
      "category": "Security",

    },
    {
      "category": "Development",
      "priorityColor": "bg-orange-100 text-orange-500",

    }, {
      "priorityColor": "bg-red-100 text-red-500",
      "category": "Design",
    }
  ];
  boardPriority: any[] = [
    {
      "priorityColor": "bg-green-100 text-green-500",
      "priority": "High",

    },
    {
      "priority": "Medium",
      "priorityColor": "bg-orange-100 text-orange-500",

    }, {
      "priorityColor": "bg-red-100 text-red-500",
      "priority": "Urgent",
    }
  ];
  cardStatus: string[] = ['Backlog', 'To Do', 'Work in Progress', 'Completed'];

  ngOnInit(): void {
    this.viewType = this.data?.type
    console.log('this.data: ', this.data);
    this.componentData = this.data;
    if (this.viewType === DiscoverPageType.Card || this.viewType === DiscoverPageType.Table || this.viewType === DiscoverPageType.Graph || this.viewType === DiscoverPageType.Board) {
      this.activeTab = 'add'
    }

    if (this.viewType === DiscoverPageType.Table) {
      this.FindconceptTypes = this.tableTabs;
      this.selectedStatus = this.statuses[0];
      this.owners = entities.goal.views.card.owners.slice(0, 3);
      this.priorities = entities.goal.views.card.priorities;
      this.selectedOwners = this.owners[0];
      this.selectedPriority = this.priorities[0];
    }

    if (this.viewType === DiscoverPageType.Graph) {
      this.graphNodeForm = this.fb.group({
        key: ['', Validators.required],
        text: ['', Validators.required],
        loc: ['', Validators.required],
        isPinned: [true]
      });

      this.NodeLinkForm = this.fb.group({
        from: ['', Validators.required],
        to: ['', Validators.required],
        label: ['', Validators.required]
      });

    }

    if (this.viewType === DiscoverPageType.Board) {
      this.boardCardForm = this.fb.group({
        cardStatus: ['', Validators.required],
        id: ['1'],
        goal: ['', Validators.required],
        description: ['', Validators.required],
        priority: ['High', Validators.required],
        category: ['Security', Validators.required],
        market: [''],
        priorityColor: ['bg-green-100 text-green-500'],
        categoryColor: ['bg-purple-100 text-purple-500'],
        marketColor: [''],
        avatars: this.fb.array([
          'avater.png',
          'avater2.png'
        ]),
        comments: [3]
      });
    }

    if(this.viewType === DiscoverPageType.Excel){
            this.FindconceptTypes = this.tableTabs;
      this.selectedStatus = this.statuses[0];
      this.owners = entities.goal.views.card.owners.slice(0, 3);
      this.priorities = entities.goal.views.card.priorities;
      this.selectedOwners = this.owners[0];
      this.selectedPriority = this.priorities[0];
    }

    if(this.viewType === DiscoverPageType.Timeline){
      this.timeLineForm = this.fb.group({
        goals: this.fb.array([]),
        incidents: this.fb.array([]),
        objectives: this.fb.array([]),
        processes: this.fb.array([]),
        projects: this.fb.array([]),
      });

      ['goals', 'incidents', 'objectives', 'processes', 'projects'].forEach(type => {
        this.addItem(type);
      });
    }

    if (this.viewType === DiscoverPageType.Organization) {
      this.organizationForm = this.fb.group({
        name: ['', Validators.required],
        title: ['', Validators.required],
        dept: ['Production', Validators.required],
        pic: ['10.png'],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', Validators.required],
        parent: [''],
      });
    }
  }

  switchToCreateTab() {
    this.activeTab = 'create';
    this.searchQuery = '';
    this.selectedConceptType = null;
    this.filteredConceptTypes = [...this.SelectconceptTypes];
  }

  switchToAddTab() {
    this.activeTab = 'add';
    this.searchQuery = '';
    this.selectedConceptType = null;
    this.filteredConceptTypes = [...this.FindconceptTypes];
  }

  filterConceptTypes() {
    const sourceList = this.activeTab === 'create' ? this.SelectconceptTypes : this.FindconceptTypes;

    if (!this.searchQuery) {
      this.filteredConceptTypes = [...sourceList];
      return;
    }

    const query = this.searchQuery.toLowerCase();
    this.filteredConceptTypes = sourceList.filter(concept =>
      concept.type.toLowerCase().includes(query) ||
      concept.description.toLowerCase().includes(query)
    );
  }

  selectConceptType(concept: ConceptType) {
    this.selectedConceptType = concept.type;
    if (this.viewType === DiscoverPageType.Card) {
      this.router.navigate(['/discover/goal'], { queryParams: { type: concept.type, isCreate: true } });
      this.dialogRef.close();
    }
  }

  onCancel() {
    console.log('Cancel clicked');
    this.selectedConceptType = null;
    this.searchQuery = '';
    this.filterConceptTypes();
    this.dialogRef.close();
  }

  onCreateData() {
    if (!this.selectedConceptType) return;
    this.resetForm();
  }

  onAddData() {
    if (this.viewType === DiscoverPageType.Table && this.taskName) {
      const tableRecord = {
        "newRow": {
          taskName: this.taskName,
          status: this.selectedStatus.name,
          priority: this.selectedPriority.name,
          dueDate: this.datePipe.transform(new Date(this.dueDate), 'MMMM d, y'),
          owner: this.selectedOwners.name,
          avatar: './assets/avatar/15.png'

        },
        "selectedTableTab": this.tableSelectedTab
      }
      console.log('tableRecord: ', tableRecord);
      this.dialogRef.close(tableRecord);
    }
    else if (this.viewType === DiscoverPageType.Graph) {
      if (this.graphActiveTab === 'add_node') {
        this.graphNodeForm.markAllAsTouched();
        if (this.graphNodeForm.valid) {
          this.componentData.graphElements.nodes.push(this.graphNodeForm.value)
          console.log('is.componentData.graphElements: ', this.componentData.graphElements);
          this.dialogRef.close(this.componentData.graphElements);
        }
      }
      else {
        this.NodeLinkForm.markAllAsTouched();
        if (this.NodeLinkForm.valid) {
          this.componentData.graphElements.links.push(this.NodeLinkForm.value)
          console.log('is.componentData.graphElements: ', this.componentData.graphElements);
          this.dialogRef.close(this.componentData.graphElements);
        }
      }
    }
    else if (this.viewType === DiscoverPageType.Board) {
      this.boardCardForm.markAllAsTouched();
      if (this.boardCardForm.valid) {

        this.dialogRef.close(this.boardCardForm.value);
      }
    }
   else if (this.viewType === DiscoverPageType.Excel && this.taskName) {
      const tableRecord = {
        "newRow": {
          taskName: this.taskName,
          status: this.selectedStatus.name,
          priority: this.selectedPriority.name,
          dueDate: this.datePipe.transform(new Date(this.dueDate), 'MMMM d, y'),
          owner: this.selectedOwners.name,
          avatar: './assets/avatar/15.png'

        },
      }
      console.log('tableRecord: ', tableRecord);
      this.dialogRef.close(tableRecord);
    }
    else if (this.viewType === DiscoverPageType.Timeline) {

      const cleanedData = Object.fromEntries(
        Object.entries(this.timeLineForm.value).map(([key, arr]) => [
          key,
          (arr as any[]).filter(item => item.name?.trim() !== '')
        ])
      );
      this.dialogRef.close(cleanedData);
    }
    else if (this.viewType === DiscoverPageType.Organization) {
      this.organizationForm.markAllAsTouched();
      if (this.organizationForm.valid) {
        const employeeNodeDetail = {
          key: Math.floor(Math.random() * (100 - 14 + 1)) + 14,
          ...this.organizationForm.value
        }
        if (employeeNodeDetail?.parent) {
          employeeNodeDetail.parent = Number(employeeNodeDetail.parent)
        }
        this.dialogRef.close(employeeNodeDetail);
      }
    }
    if (!this.selectedConceptType) return;
    this.resetForm();
  }

  private resetForm() {
    this.selectedConceptType = null;
    this.searchQuery = '';
    this.filterConceptTypes();
  }

  handleSelection(tab: 'create' | 'add') {
    if (this.viewType === DiscoverPageType.Card || this.viewType === DiscoverPageType.Board || this.viewType === DiscoverPageType.Table || this.viewType === DiscoverPageType.Graph || this.viewType === DiscoverPageType.Excel || this.viewType === DiscoverPageType.Timeline || this.viewType === DiscoverPageType.Organization) {
      tab = 'add'
    }
    this.activeTab = tab;
    this.searchQuery = '';
    this.selectedConceptType = null;
    this.filteredConceptTypes = tab === 'create'
      ? [...this.SelectconceptTypes]
      : [...this.FindconceptTypes];
    this.showSelectionScreen = false;
  }

  closeDialog() {
    this.dialogRef.close();
  }


  selectTableTabType(tabDetail: ConceptType) {
    this.tableSelectedTab = tabDetail.type;
  }

  toggleDropdownOwner() {
    this.dropdownOwner = !this.dropdownOwner;
  }
  toggleDropdownStatus() {
    this.dropdownStatus = !this.dropdownStatus;
  }
  toggleDropdownPriority() {
    this.dropdownPriority = !this.dropdownPriority;
  }
  selectStatus(status: any) {
    this.selectedStatus = status;
    this.dropdownStatus = false;
  }

  selectOwner(owner: any) {
    this.selectedOwners = owner;
    this.dropdownOwner = false;
  }
  selectPriority(priority: any) {
    this.selectedPriority = priority;
    this.dropdownPriority = false;
  }

  // Graph Nodes 
  toggleGraphTab(tab: string) {
    this.graphActiveTab = tab;
    this.graphNodeForm.reset();
    this.NodeLinkForm.reset();
  }
  hasNodeFormError(controlName: keyof typeof this.graphNodeForm.controls) {
    return (
      this.graphNodeForm.controls[controlName].invalid &&
      this.graphNodeForm.controls[controlName].touched
    );
  }

  hasNodeLinkError(controlName: keyof typeof this.NodeLinkForm.controls) {
    return (
      this.NodeLinkForm.controls[controlName].invalid &&
      this.NodeLinkForm.controls[controlName].touched
    );
  }

  // board card
  hasBoardCardFormError(controlName: keyof typeof this.boardCardForm.controls) {
    return (
      this.boardCardForm.controls[controlName].invalid &&
      this.boardCardForm.controls[controlName].touched
    );
  }

  // organization Form
   hasOrganizationFormError(controlName: keyof typeof this.organizationForm.controls) {
    return (
      this.organizationForm.controls[controlName].invalid &&
      this.organizationForm.controls[controlName].touched
    );
  }

   getFormArray(type: string): FormArray {
    return this.timeLineForm.get(type) as FormArray;
  }

  addItem(type: string) {
    const array = this.getFormArray(type);
    array.push(this.createItem(type));
  }

  removeItem(type: string, index: number) {
    this.getFormArray(type).removeAt(index);
  }

  createItem(type: string): FormGroup {
    const base:any = this.fb.group({
      name: [''],
      progress: [45],
      comments: [0],
      pinned: [false],
    });
     if (type === 'incidents') {
   const defaultNumbers = [3, 7, 11, 19, 23, 5, 17, 13, 2, 29, 31, 1];
    const numbersArray = this.fb.array(defaultNumbers.map(n => this.fb.control(n)));
    base.addControl('numbers', numbersArray); // comma-separated
    }

    return base;
  }

}
