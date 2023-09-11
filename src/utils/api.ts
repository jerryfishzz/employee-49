import axios from 'axios';

import { HOST_URL } from 'src/data/host';

export async function getTasks(): Promise<any> {
  try {
    const response = await axios(`${HOST_URL}`);
    return response.data;
  } catch (e) {
    console.error(e);
  }
}

export async function getDetail(id: string): Promise<any> {
  try {
    const response = await axios(`${HOST_URL}/detail/${id}`);
    return response.data;
  } catch (e) {
    console.error('error');
    console.error(e);
    throw e;
  }
}
