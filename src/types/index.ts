// ─── Auth types ───────────────────────────────────────────────────────────────

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
}

export interface UserDto {
  id: number;
  name: string;
  email: string;
}

// ─── Quantity types ────────────────────────────────────────────────────────────

export type MeasurementType =
  | 'LengthUnit'
  | 'WeightUnit'
  | 'VolumeUnit'
  | 'TemperatureUnit';

export type MeasurementCategory = 'length' | 'weight' | 'volume' | 'temperature';

export type ActionType = 'comparison' | 'conversion' | 'arithmetic';

export type ArithmeticOperator = '+' | '-' | '*' | '/';

export interface QuantityDTO {
  value: number;
  unit: string;
  measurementType: MeasurementType;
}

export interface QuantityInputDTO {
  thisQuantityDTO: QuantityDTO;
  thatQuantityDTO: QuantityDTO;
  targetQuantityDTO?: QuantityDTO | null;
}

export interface QuantityMeasurementDTO {
  resultValue?: number;
  resultUnit?: string;
  resultString?: string | null;
  operationType?: string;
  measurementType?: string;
}

export interface MeasurementHistoryEntry {
  id: string;
  createdAt: string;
  selectedType: MeasurementCategory;
  action: ActionType;
  operator?: ArithmeticOperator;
  value1: string;
  unit1: string;
  value2?: string;
  unit2?: string;
  resultUnit: string;
  result: QuantityMeasurementDTO;
}

// ─── UI state types ────────────────────────────────────────────────────────────

export interface DashboardState {
  selectedType: MeasurementCategory;
  action: ActionType;
  value1: string;
  unit1: string;
  value2: string;
  unit2: string;
  resultUnit: string;
  operator: ArithmeticOperator;
  result: QuantityMeasurementDTO | null;
  loading: boolean;
  error: string | null;
}
