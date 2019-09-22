import * as algoliasearch from "algoliasearch";
import * as dotenv from "dotenv";
import { createConnection } from "typeorm";
import ormconfig from "../../ormconfig";
import { Module } from "../entities/Module";

dotenv.config();

const client = algoliasearch("3EJTXIKS8B", process.env.ALGOLIA_DEVELOPER_KEY!);
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
