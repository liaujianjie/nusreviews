Steps to run the backend:

1. Run `docker-compose up`
2. Run `cd backend`
3. Run `yarn start`

Architecture

- [Data Mapper](https://github.com/typeorm/typeorm/blob/master/docs/active-record-data-mapper.md)
- [Basic access authentication](https://en.wikipedia.org/wiki/Basic_access_authentication)
  - When a user logs in, he receives two tokens
    - access token
      - valid for 15 minutes
    - refresh token
      - valid for 7 days
  - Certain API actions requires an access token
  - If the access token is expired, server will return a `401`
  - The frontend should then request for a new one by issuing a PATCH request to api/users/request_authentication with the refresh_token in the HTTP header
    - Returns a new access token and refresh token
