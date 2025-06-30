import { CommonModule, DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { discover } from "../../../../data.json"
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
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
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private datePipe: DatePipe,
    private fb: FormBuilder
  ) { }


  ngOnInit(): void {

  }

  closeDialog() {
    this.dialogRef.close();
  }

  confirmAction() {
    this.dialogRef.close(true);

  }

}
