import { Component } from '@angular/core';
import { DataService } from './services/data.service';
import { Entry } from './model/entry';
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  displayedColumns = ["rank", "name", "date"]
  dataSource: Entry[] = [];
  formHidden = false;
  successMsgHidden = true;
  failureMsgHidden = true;
  failureMessage: string;
  formContainerStyle = {};
  fetchError = false;
  rank: string;

  form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    flag: new FormControl('', Validators.required)
  });


  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.refresh();
  }

  private refresh() {
    this.dataService.getData().subscribe(entries => {
      this.dataSource = entries;
      this.fetchError = false;
    },
      () => this.fetchError = true);
  }

  private showError(failureMessage: string) {
    this.formHidden = true;
    this.formContainerStyle = { "box-shadow": "0px 0px 30px rgba(255, 0, 0, 0.5)" };
    this.failureMsgHidden = false;
    this.successMsgHidden = true;
    this.failureMessage = failureMessage;
  }

  private showSuccess(rank: number) {
    this.formHidden = true;
    this.formContainerStyle = { "box-shadow": "0px 0px 30px rgba(40, 255, 0, 0.5)" };
    this.failureMsgHidden = true;
    this.successMsgHidden = false;
    let suffix = "";
    switch (rank % 10) {
      case 1:
        suffix = rank != 11 ? "st" : "th";
        break;
      case 2:
        suffix = rank != 12 ? "nd" : "th";
        break;
      case 3:
        suffix = rank != 13 ? "rd" : "th";
        break;
      default:
        suffix = "th";
        break;
    }
    this.rank = `${rank}${suffix}`;
  }

  backToForm() {
    this.formHidden = false;
    this.formContainerStyle = {};
    this.failureMsgHidden = true;
    this.successMsgHidden = true;
  }

  // private toggleUI(success: boolean, failureMessage: String) {
  //   if (!this.formHidden) {
  //     this.formContainerStyle = success ? {"box-shadow": "0px 0px 30px rgba(40, 255, 0, 0.5)"} : {"box-shadow": "0px 0px 30px rgba(255, 0, 0, 0.5)"};
  //     this.failureMsgHidden = success;
  //     this.successMsgHidden = !success;
  //     if (!success) {
  //       this.failureMessage = failureMessage;
  //     }
  //   } else {
  //     this.failureMsgHidden = true;
  //     this.successMsgHidden = true;
  //     this.formContainerStyle = {};
  //   }
  //   this.formHidden = !this.formHidden;
  // }

  onFlagSubmit() {
    this.dataService.submitFlag(this.form.value.flag, this.form.value.name).subscribe(resp => {
      console.log(resp);
      this.showSuccess(resp.rank);
      this.refresh();
    },
      resp => {
        if (resp.status == 417) { // flag incorrect
          this.showError("This is not the correct flag. You need to try harder.");
        } else if (resp.status == 409) { // name already exists
          this.showError("You have solved the challenge, however, the name you entered already exists.");
        } else { // connection error
          this.showError("Something went wrong... Please try again in a few minutes.");
        }
      });
  }

  // private scoreSubmit() {
  //   const dialogConfig = new MatDialogConfig();

  //   dialogConfig.disableClose = true;
  //   dialogConfig.autoFocus = true;
  //   dialogConfig.width= '400px';

  //   let dialogRef = this.dialog.open(ScoreSubmitDialogComponent, dialogConfig);
  //   dialogRef.afterClosed().subscribe(data => {
  //     this.dataService.sumbitScoreboardEntry(this.flag, data.name).subscribe(result => this.refresh());
  //   });
  // }

  scrollToElement($element): void {
    $element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  }
} 