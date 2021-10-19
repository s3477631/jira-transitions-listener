import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {JiraService} from '../../services/jira-service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-jira-list-transitions',
  templateUrl: './jira-list-transitions.component.html',
  styleUrls: ['./jira-list-transitions.component.scss']
})
export class JiraListTransitionsComponent implements OnInit {
  public jiraTransitionSearch: FormGroup = new FormGroup({
    exampleTask: new FormControl('', [Validators.required])
  })
  public projectToken: FormGroup = new FormGroup({
    projectName: new FormControl('', [Validators.required]),
    token: new FormControl('', [Validators.required])
  })
  public selectedProjectName
  public projects = {}
  public availableProjects
  public jiraProjectName

  todo: any

  done: any
  checked: any;
  pushEvents: any;
  TagPushEvents: any;
  releaseEvents: any;
  wikiPageEvents: any;
  issueEvents: any;
  mrEvents: any;
  featureFlagEvents: any;
  deployEvents: any;
  pipelineEvents: any;
  jobEvents: any;
  confidentialIssueEvents: any;
  confidentialCommentEvents: any;
  commentEvents: any;


  constructor(public jiraService: JiraService) { }

  ngOnInit(): void {
   this.projects =  JSON.parse(window.localStorage.getItem('projects'))
   this.jiraProjectName = JSON.parse(window.localStorage.getItem('jira-project-name'))
   this.jiraService.$availableProjects.subscribe(value => {
     if(value.length !== 0){
       this.availableProjects = value
     } else {
       this.availableProjects = JSON.parse(window.localStorage.getItem('user-projects'))
     }
   })
    this.jiraService.$availableTransitions.subscribe(board => {
      //@ts-ignore
      this.done = board?.transitions
    })
    this.jiraService.$repoBranches.subscribe(branches => {
      console.log(branches)
      this.todo = branches
    })

  }

  doSearch() {
    this.jiraService.searchJiraTransitions(this.jiraTransitionSearch.value.exampleTask);
    this.jiraService.getJiraProjectName(this.jiraTransitionSearch.value.exampleTask);
  }
  saveGitlabToken(){
    const project = {
      projectName: this.projectToken.value.projectName,
      projectToken: this.projectToken.value.token
    }
    window.localStorage.setItem('projects', JSON.stringify(project))
    this.jiraService.getGitlabProjects(project.projectToken);
  }

  selectProject(project) {
    this.selectedProjectName = project
    this.jiraService.getGitlabRepoBranches(project._links.repo_branches)
  }

  makeWebHook(issue: any) {

  }


  drop(event: CdkDragDrop<string[]>) {
    console.log(event)
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

}
