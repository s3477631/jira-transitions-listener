#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { JiraUpdaterStack } from '../lib/jira-updater-stack';

const app = new cdk.App();
new JiraUpdaterStack(app, 'JiraUpdaterStack');
