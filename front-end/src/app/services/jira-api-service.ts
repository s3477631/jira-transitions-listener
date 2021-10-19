import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JiraApiService {
  constructor(public http: HttpClient) {
  }

  public findListJiraTransitions(exampleTask: string): Observable<any> {
    const cloudId = JSON.parse(window.localStorage.getItem('cloud_id'))
    const url = `https://api.atlassian.com/ex/jira/${cloudId}/rest/api/3/issue/${exampleTask}/transitions`;
    const bearerToken = JSON.parse(window.localStorage.getItem('auth_token'))
    const options = {
      headers: {
        'cache-control': 'no-cache',
        'Authorization': `Bearer ${bearerToken.access_token}`,
        'Content-Type': 'application/json'
      }
    };
    return this.http.get(url, options);
  }

  public getAccessibleResources(): Observable<any>{
    const url = 'https://api.atlassian.com/oauth/token/accessible-resources'
    const bearerToken = JSON.parse(window.localStorage.getItem('auth_token'))
    const options = {
      headers: {
        'cache-control': 'no-cache',
        'Authorization': `Bearer ${bearerToken.access_token}`,
        'Accept': 'application/json'
      }
    };
    return  this.http.get(url, options)
  }

  public getAuthToken(authCode: string): Observable<any> {
    const url = 'https://auth.atlassian.com/oauth/token';
    const options = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const body = {
      'grant_type': 'authorization_code',
      'client_id': 'M70ubPh4KE6JG1OArbSA5ahJH4Etn27g',
      'client_secret': 'KTnzkMCW3AkKL-haOiJWRQIvqNUgCcKqQsrEo6dt64OKC26vgm6mf6h9248FhVeK',
      'code': authCode,
      'redirect_uri': 'https://menu-ordering-system.com/'
    };
    return this.http.post(url, body, options);
  }

  public getJiraProjectName(issueName: string): Observable<any> {
    const url = `https://api.atlassian.com/ex/jira/rest/api/3/issue/${issueName}`
    return this.http.get(url);
  }

  public getGitlabProjects(auth_token: string): Observable<any>{
    const url = 'https://gitlab.com/api/v4/projects?membership=true'
    const options = {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    }
    return this.http.get(url, options)
  }
  public gitLabBranches(repoUrl: string): Observable<any>{
    const token = JSON.parse(window.localStorage.getItem('projects')).projectToken
    const options = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
    return this.http.get(repoUrl, options)
  }

}
