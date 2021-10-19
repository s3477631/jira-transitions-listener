import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {JiraApiService} from './jira-api-service';

@Injectable({
  providedIn: 'root'
})
export class JiraService {
  private _availableTransitions: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public $availableTransitions: Observable<any[]> = this._availableTransitions.asObservable();
  private _availableResources: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public $availableResources: Observable<any[]> = this._availableResources.asObservable();

  private _availableProjects: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public $availableProjects: Observable<any[]> = this._availableProjects.asObservable();

  private _repoBranches: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public $repoBranches: Observable<any[]> = this._repoBranches.asObservable();

  constructor(public jiraApiService: JiraApiService) {
  }
  public searchJiraTransitions(exampleTask: string): void {
    this.jiraApiService.findListJiraTransitions(exampleTask).subscribe((data) => {
      this._availableTransitions.next(data)
    })
  }
  public setBearerToken(authCode: string): void {
    this.jiraApiService.getAuthToken(authCode).subscribe(bearerToken => {
      if(bearerToken){
        window.localStorage.setItem('auth_token', JSON.stringify(bearerToken))
        this.getAccessibleResources()
      }
    })
  }
  public getAccessibleResources(): void{
    this.jiraApiService.getAccessibleResources().subscribe(resources => {
      if(resources){
        window.localStorage.setItem('cloud_id', JSON.stringify(resources[0].id))
      }
    })
  }
  public getGitlabProjects(authCode: string): void{
    this.jiraApiService.getGitlabProjects(authCode).subscribe(projects => {
      if(projects){
        window.localStorage.setItem('user-projects', JSON.stringify(projects))
        this._availableProjects.next(projects)
      }
    })
  }
  public getJiraProjectName(issueName: string): void{
    this.jiraApiService.getJiraProjectName(issueName).subscribe(jiraProjectName => {
      if(jiraProjectName){
        window.localStorage.setItem('jira-project-name', JSON.stringify(jiraProjectName))
      }
    })
  }
  public getGitlabRepoBranches(repoUrl: string): void{
    this.jiraApiService.gitLabBranches(repoUrl).subscribe(branch => {
      if(branch){
        this._repoBranches.next(branch)
      }
    })
  }

}
