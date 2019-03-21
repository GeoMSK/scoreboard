import { Component } from '@angular/core';
import { DataService } from './services/data.service';
import { Entry } from './model/entry';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { ScoreSubmitDialogComponent } from './components/score-submit-dialog/score-submit-dialog.component';
import { refreshDescendantViews } from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  flag: String = "";
  title = 'Test';
  displayedColumns = ["rank", "name", "date"]
  dataSource: Entry[];

  constructor(private dataService: DataService, private dialog: MatDialog) { }

  ngOnInit() {
    this.refresh();
  }

  private refresh() {
    this.dataService.getData().subscribe(entries => {
      this.dataSource = entries;
    });
  }

  onFlagUpdate(event: Event) {
    this.flag = (<HTMLInputElement>event.target).value;
  }

  onFlagSubmit() {
    console.log(`flag: ${this.flag}`);
    this.dataService.submitFlag(this.flag).subscribe(success => {
      if (success) {
        this.scoreSubmit();
      } else {
        alert("false");
      }
    });
  }

  private scoreSubmit() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    // dialogConfig.height = '400px';
    // dialogConfig.width= '600px';

    let dialogRef = this.dialog.open(ScoreSubmitDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      console.log("Dialog output:", data);
      this.dataService.sumbitScoreboardEntry(this.flag, data.name).subscribe(result => this.refresh());
    });
  }
} 