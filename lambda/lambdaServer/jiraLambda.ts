import {
    APIGatewayProxyEvent,
    APIGatewayProxyResult
} from 'aws-lambda';
import axios from 'axios';

export const lambdaHandler = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'POST',
            // pass in jira issue id from webhook
            url: 'https://ordered.atlassian.net/rest/api/3/issue/FEED-1/transitions',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Basic b3JkZXJlZC5jbG91ZEBvdXRsb29rLmNvbTpaYXYxTjlzcXJJNVhHbnBzM1dvMUZCOTQ='
            },
            data: {
                "transition": {
                    "id": "31"
                }
            }
        }).then(() => {
            resolve()
        })
    })
}

