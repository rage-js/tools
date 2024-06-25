import MongoDBSchema from "./MongoDBSchema";

/**
 * A type class that allows the user to perform collection related operations like finding, writing and deleting documents.
 */
class MongoDBCollection {
  collectionName: string;
  documents: Object[];

  constructor(collectionName: string, documents: Object[]) {
    this.collectionName = collectionName;
    this.documents = documents;
    const res = new MongoDBSchema({ name: String, age: Number });
    res.logSchmea();
  }
}

export default MongoDBCollection;
