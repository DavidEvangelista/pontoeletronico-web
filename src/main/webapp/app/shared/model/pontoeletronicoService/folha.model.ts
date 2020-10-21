import { Moment } from 'moment';

export interface IFolha {
  id?: number;
  data?: Moment;
  userLogin?: string;
  userId?: number;
}

export class Folha implements IFolha {
  constructor(public id?: number, public data?: Moment, public userLogin?: string, public userId?: number) {}
}
