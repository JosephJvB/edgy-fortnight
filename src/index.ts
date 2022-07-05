import { CloudFrontRequest, CloudFrontRequestEvent, CloudFrontResponseResult } from "aws-lambda"

export const handler = async (event: CloudFrontRequestEvent): Promise<CloudFrontResponseResult | CloudFrontRequest> => {
  const request = event.Records[0].cf.request
  const hostHeader = request.headers.host[0]
  // redirect apex to www
  if (request.uri == '/' && hostHeader?.key == 'Host' && hostHeader?.value == 'jaf-unwrapped.com') {
    return {
      status: '301',
      statusDescription: 'Moved Permanently',
      headers: {
        location: [{
          key: 'location',
          value: 'https://www.jaf-unwrapped.com'
        }]
      }
    }
  } else {
    return request
  }
}