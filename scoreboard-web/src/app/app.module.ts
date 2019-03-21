import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { MatTableModule, MatDialogModule, MatFormFieldModule, MatButtonModule, MatInputModule } from '@angular/material';

import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { ScoreSubmitDialogComponent } from './components/score-submit-dialog/score-submit-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ScoreSubmitDialogComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, MatTableModule, HttpClientModule, MatDialogModule, MatFormFieldModule, MatButtonModule, MatInputModule,
     FormsModule, ReactiveFormsModule, 
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    ScoreSubmitDialogComponent
  ],
})
export class AppModule { }
