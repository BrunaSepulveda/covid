export type CovidStatusCountry = {
  country: string;
  cases: number;
  confirmed: number;
  deaths: number;
  recovered: number;
  updated_at: string;
  }

export interface CovidStatusByState {
  uid: number;
  uf: string;
  state: string;
  cases: number;
  deaths: number;
  suspects: number;
  refuses: number;
  datetime: string;
}

export interface CovidStatusByStateInfo extends CovidStatusByState {
  broadcast: boolean;
  comments: string;
}