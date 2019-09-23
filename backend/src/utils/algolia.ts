import * as algoliasearch from "algoliasearch";
import * as dotenv from "dotenv";
import { createConnection } from "typeorm";
import ormconfig from "../../ormconfig";
import { Module } from "../entities/Module";

dotenv.config();

export const ALGOLIA_APPLICATION_ID = "3EJTXIKS8B";

const client = algoliasearch(
  ALGOLIA_APPLICATION_ID,
  process.env.ALGOLIA_DEVELOPER_KEY!
);
const modulesIndex = client.initIndex("modules");

createConnection(ormconfig)
  .then(async connection => {
    const moduleList = await connection.getRepository(Module).find();
    modulesIndex.addObjects(moduleList);
  })
  .catch(error => console.error(error));

modulesIndex.setSettings(
  {
    searchableAttributes: [
      "moduleCode",
      "description",
      "faculty",
      "department",
      "title"
    ]
  },
  content => {
    console.log(content);
  }
);
