import {Statistics, Website} from 'src/models/base_data';

export interface ScanRSTable {
  _id: string,
  basic_information: {
    websites: Website[],
    group_name: string,
    group_id: string,
    type: string,
    emails: string[],
    time_started: string,
    time_finished: string,
    user: string,
    progress: number,
    status: string
  },
  statistics: Statistics
}

export interface ScanRS {
    emails: string[],
    group_id: string,
    group_name: string,
    progress: number,
    statistics: Statistics,
    status: string,
    time_finished: string,
    time_started: string,
    type: string,
    user: string,
    websites: Website[]
}

export interface TargetRS{
  basic_information: {
    progress: number,
    scan_id: string,
    state: string,
    status: string,
    time_finished: string,
    time_started: string,
    type: string,
    user: string,
    website: string
  }
  overview_data: {
    desc: string,
    name: string,
    sol: string,
    ref: any,
    wstg: string[]
  }[],
  statistics: {
    vuln: Statistics,
    other: any,

  }
}
