export type Step = {
  id: string;
  name: string;
  description: string;
};

export type Procedure = {
  steps: Step[];
};

export type RowDataWithProcedure = {
  procedure: Procedure;
};
