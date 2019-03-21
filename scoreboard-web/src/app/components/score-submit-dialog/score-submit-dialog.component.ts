import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-score-submit-dialog',
  templateUrl: './score-submit-dialog.component.html',
  styleUrls: ['./score-submit-dialog.component.scss']
})
export class ScoreSubmitDialogComponent {

  form: FormGroup;
  name: String;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ScoreSubmitDialogComponent>
    ) {
    this.form = fb.group({name: [name, Validators.required]});
   }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

}
