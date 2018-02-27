import { Continuator } from './models';

export const allowContinuator: Continuator = response => Promise.resolve(response);
export const ignoreContinuator: Continuator = response => Promise.reject(null);
