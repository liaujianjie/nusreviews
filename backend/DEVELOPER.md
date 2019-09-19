Steps to run the backend:

1. Run `docker-compose up`
2. Run `cd backend`
3. Run `yarn start`

[POSTMAN Workspace](https://app.getpostman.com/join-team?invite_code=ab3e3a87fb0801eb4f46552d112a4d1b)

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
  - The frontend should then request for a new one by issuing a PATCH request to api/users/refresh_authentication with the refresh_token in the HTTP header
    - Returns a new access token and refresh token

[API design Guide](http://weblog.jamisbuck.org/2007/2/5/nesting-resources)

- Rule of thumb: resources should never be nested more than 1 level deep
- A collection may need to be scoped by its parent, but a specific member can always be accessed directly by an id

Editing anonymous items requires an `edit token` which is issued when the item is created

- valid for 120 days
