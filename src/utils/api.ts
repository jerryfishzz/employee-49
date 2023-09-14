import axios from 'axios';

import { HOST_URL } from 'src/data/host';

export async function getTasks(): Promise<any> {
  try {
    const response = await axios(`${HOST_URL}`);
    console.log('getTasks');
    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function getDetail(id: string): Promise<any> {
  try {
    const response = await axios(`${HOST_URL}/detail/${id}`);
    console.log('getDetail');
    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
}
