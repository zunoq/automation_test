export interface Job {
  id: string,
  group_id: string,
  start_time: string,
  data: {
    group_name: string,
    group_id: string,
    websites: string[],
    user_id: string,
    type: string,
    start_time: string
  }
}
