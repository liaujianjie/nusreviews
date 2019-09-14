Steps to run the backend:

1. Run `docker-compose up`
2. Run `cd backend`
3. Run `yarn start`

Architecture

- [Data Mapper](https://github.com/typeorm/typeorm/blob/master/docs/active-record-data-mapper.md)
- [Basic access authentication](https://en.wikipedia.org/wiki/Basic_access_authentication)
  - The JWT is currently set expire after an hour.
  - To request for a new one, issue a call to
  - Consider the scenario where the user has
