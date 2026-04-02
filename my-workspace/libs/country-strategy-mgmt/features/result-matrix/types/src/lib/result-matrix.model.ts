export type ResultMatrixStatus = 'draft' | 'active';

export interface StrategicObjective {
  id: string;
  title: string;
  description?: string;
  order: number;
}

export interface PriorityArea {
  id: string;
  name: string;
  order: number;
  strategicObjectives: StrategicObjective[];
}

export interface GovernmentPriority {
  id: string;
  name: string;
  order: number;
  priorityAreas: PriorityArea[];
}

export interface ResultMatrix {
  id: string;
  name: string;
  countryStrategyId: string;
  status: ResultMatrixStatus;
  governmentPriorities: GovernmentPriority[];
  updatedAt: string;
}

export type ResultMatrixSummary = Pick<ResultMatrix, 'id' | 'name' | 'countryStrategyId' | 'status' | 'updatedAt'>;

export interface StrategicObjectiveInput {
  title: string;
  description?: string;
}

export interface PriorityAreaInput {
  name: string;
  strategicObjectives: StrategicObjectiveInput[];
}

export interface GovernmentPriorityInput {
  name: string;
  priorityAreas: PriorityAreaInput[];
}

export interface CreateResultMatrixInput {
  name: string;
  countryStrategyId: string;
  governmentPriorities: GovernmentPriorityInput[];
}

export interface UpdateResultMatrixInput {
  name: string;
  countryStrategyId: string;
  governmentPriorities: GovernmentPriorityInput[];
}

export interface EditableNodeMeta {
  clientId: string;
  isNew: boolean;
  isDirty: boolean;
}

export type EditableStrategicObjective = StrategicObjectiveInput &
  Partial<Pick<StrategicObjective, 'id'>> &
  EditableNodeMeta;

export type EditablePriorityArea = Omit<PriorityAreaInput, 'strategicObjectives'> &
  Partial<Pick<PriorityArea, 'id'>> &
  EditableNodeMeta & {
    strategicObjectives: EditableStrategicObjective[];
  };

export type EditableGovernmentPriority = Omit<GovernmentPriorityInput, 'priorityAreas'> &
  Partial<Pick<GovernmentPriority, 'id'>> &
  EditableNodeMeta & {
    priorityAreas: EditablePriorityArea[];
  };

export interface EditableResultMatrix {
  id?: string;
  name: string;
  countryStrategyId: string;
  governmentPriorities: EditableGovernmentPriority[];
}
