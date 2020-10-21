import { Moment } from 'moment';

export interface ITimesheet {
  id?: number;
  weekday?: Moment;
  goLunch?: number;
  backLunch?: number;
  checkin?: number;
  checkout?: number;
  total?: number;
  userLogin?: string;
  userId?: number;
}

export class Timesheet implements ITimesheet {
  constructor(
    public id?: number,
    public weekday?: Moment,
    public goLunch?: number,
    public backLunch?: number,
    public checkin?: number,
    public checkout?: number,
    public total?: number,
    public userLogin?: string,
    public userId?: number
  ) {}
}
