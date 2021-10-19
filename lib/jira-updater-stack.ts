import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as iam from '@aws-cdk/aws-iam';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import path = require('path');

export class JiraUpdaterStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const lambdaRole = new iam.Role(this, 'lambdaRole', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com')
    })
    lambdaRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AdministratorAccess'))
    const lambdaServer = new lambda.Function(this, 'lambdaApiServer', {
      runtime: lambda.Runtime.NODEJS_12_X,
      role: lambdaRole,
      handler: 'jiraLambda.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../lambda/lambdaServer/')),
      timeout: cdk.Duration.seconds(300)
    })
    const userServer = new lambda.Function(this, 'lambdaUserServer', {
      runtime: lambda.Runtime.NODEJS_12_X,
      role: lambdaRole,
      handler: 'lambdaUserServer.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../lambda/lambdaUserServer')),
      timeout: cdk.Duration.seconds(300)
    })
    const table = new dynamodb.Table(this, 'Table', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      tableName: 'gitlab-hook-table'
    });
  }
}
