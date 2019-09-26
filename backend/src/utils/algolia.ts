import * as algoliasearch from "algoliasearch";
import * as dotenv from "dotenv";
dotenv.config({ path: `${__dirname}/../../.env` });
import { createConnection } from "typeorm";
import { MetricTemplate } from "../entities/MetricTemplate";
import { Module } from "../entities/Module";
import ormconfig from "../../ormconfig";

export const ALGOLIA_APPLICATION_ID = "3EJTXIKS8B";

const client = algoliasearch(
  ALGOLIA_APPLICATION_ID,
  process.env.ALGOLIA_DEVELOPER_KEY!
);
const modulesIndex = client.initIndex("modules");

createConnection(ormconfig)
  .then(async connection => {
    const moduleList = await connection.getRepository(Module).find({
      relations: [
        "moduleSemesters",
        "moduleSemesters.reviews",
        "moduleSemesters.reviews.metrics",
        "moduleSemesters.reviews.metrics.metricTemplate"
      ]
    });
    const objects: any[] = [];
    moduleList.forEach(module => {
      const metricAggregates: Record<number, number> = {};
      const metricTemplates: Record<number, MetricTemplate> = {};
      module.moduleSemesters.forEach(moduleSemester => {
        moduleSemester.reviews.forEach(review => {
          review.metrics.forEach(metric => {
            const id = metric.metricTemplate.id;
            metricAggregates[id] = metric.value + (metricAggregates[id] || 0);
            metricTemplates[id] = metric.metricTemplate;
          });
        });
      });

      objects.push({
        ...module,
        objectID: module.moduleCode,
        metricAggregates,
        metricTemplates
      });
    });
    modulesIndex.saveObjects(objects);
  })
  .catch(error => console.error(error));
