import {Routes} from '@angular/router';
import {JiraListTransitionsComponent} from './components/jira-list-transitions/jira-list-transitions.component';
import {HomeComponent} from './components/home/home.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'config',
    component: JiraListTransitionsComponent
  }
]
