import axios from 'axios';

import { HOST_URL } from 'src/data/host';
import { Task } from 'src/context/task.schema';

export async function getTasks(): Promise<Task[]> {
  try {
    const response = await axios(`${HOST_URL}`);
    console.log('getTasks');
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function getDetail(id: string): Promise<Task> {
  try {
    const response = await axios(`${HOST_URL}/detail/${id}`);
    console.log('getDetail');
    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
}
