import { Component } from '@angular/core';
import { DataService } from './services/data.service';
import { Entry } from './model/entry';

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

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getData().subscribe(entries => {
      this.dataSource = entries;
    });
  }

  onFlagUpdate(event: Event) {
    this.flag = (<HTMLInputElement>event.target).value;
  }

  onFlagSubmit() {
    console.log(`flag: ${this.flag}`);
    this.dataService.submitFlag(this.flag).subscribe(success => alert(success));
  }
} 