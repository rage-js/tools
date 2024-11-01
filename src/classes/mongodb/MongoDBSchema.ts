import { SchemaConfigurationType } from "../../main";

/**
 * A type class to define a collection's schema.
 */
class MongoDBSchema {
  private schema: SchemaConfigurationType;

  constructor(schema: SchemaConfigurationType) {
    this.schema = schema;
  }

  /**
   * Returns the schema.
   * @returns {import("../../main").SchemaConfigurationType}
   */
  getSchema(): SchemaConfigurationType {
    return this.schema;
  }
}

export default MongoDBSchema;
