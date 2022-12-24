import {Statistics, Website} from 'src/models/base_data';

export interface ScanRS {
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
