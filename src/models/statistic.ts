export interface TopCVE {
  critical: object;
  high: object;
  medium: object;
  low: object;
  info: object;
}
export interface Cves {
  critical: number;
  high: number;
  medium: number;
  low: number;
  info: number;
}
export interface ScanRs {
  group_name: string,
  websites: [],
  time_started: string,
  type: string,
  status: string

}
