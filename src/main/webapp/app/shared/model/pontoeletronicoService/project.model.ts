import { ITimesheet } from 'app/shared/model/pontoeletronicoService/timesheet.model';

export interface IProject {
  id?: number;
  name?: string;
  allocatedHours?: number;
  manager?: number;
  description?: string;
  timesheets?: ITimesheet[];
  userLogin?: string;
  userId?: number;
}

export class Project implements IProject {
  constructor(
    public id?: number,
    public name?: string,
    public allocatedHours?: number,
    public manager?: number,
    public description?: string,
    public timesheets?: ITimesheet[],
    public userLogin?: string,
    public userId?: number
  ) {}
}
