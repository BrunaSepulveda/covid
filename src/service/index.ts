import axios from "axios";
import { DateTime } from 'luxon';
import { CovidStatusByState, CovidStatusByStateInfo, CovidStatusCountry } from "../types";

export function dateFromISOString(date: Date, toFormat="dd/MM/yyyy"){
  return DateTime.fromJSDate(date).toFormat(toFormat)
}

export function dateFormatter(date: Date, format="yyyyMMdd") {
  return DateTime.fromJSDate(date).toFormat(format);
}

const api = axios.create({
  baseURL: 'https://covid19-brazil-api.now.sh/api/report/v1',
});

async function getByCountry(contry: string): Promise<CovidStatusCountry[]> {
  const response = await api.get(`/${contry}`);
  return [response.data.data] || [{}]
}

async function getByAllCountry(): Promise<CovidStatusCountry[]> {
  const response = await api.get('/countries');
  return response.data.data || []
}

async function getAllStatusByStateInBrazil(): Promise<CovidStatusByStateInfo[]> {
  const response = await api.get('');
  return response.data.data || []
}

async function getStatusByState(state: string): Promise<CovidStatusByState[]> {
  const response = await api.get(`/brazil/uf/${state}`);
  return [response.data] || [{}]
}

async function getStatusByStateInDate(date: Date): Promise<CovidStatusByStateInfo[]> {
  const response = await api.get(`/brazil/${dateFormatter(date)}`);
  return response.data.data || []
}

export { getByCountry, getStatusByState, getStatusByStateInDate, getAllStatusByStateInBrazil, getByAllCountry };