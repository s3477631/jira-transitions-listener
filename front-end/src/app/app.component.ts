import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {JiraService} from './services/jira-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private activeRoute: ActivatedRoute, private route: Router, private jiraService: JiraService) {
  }
  ngOnInit() {
    this.activeRoute.queryParams.subscribe(params => {
      if(params.code){
        this.jiraService.setBearerToken(params.code)
        this.route.navigate(['/config'], {relativeTo: this.activeRoute})
      }
    })
  }

}
