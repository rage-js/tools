interface configurationType {
  method: "PAI";
  methodSpecificSettings: {
    interval?: number;
  };
  databaseType: "MongoDB";
  databaseSpecificSettings: {
    secretKey?: string;
    dbs?: string[];
    excludeCollections?: string[];
  };
  outDir: string;
}

export { configurationType };
