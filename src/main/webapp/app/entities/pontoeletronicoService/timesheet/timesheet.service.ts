import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITimesheet } from 'app/shared/model/pontoeletronicoService/timesheet.model';

type EntityResponseType = HttpResponse<ITimesheet>;
type EntityArrayResponseType = HttpResponse<ITimesheet[]>;

@Injectable({ providedIn: 'root' })
export class TimesheetService {
  public resourceUrl = SERVER_API_URL + 'services/pontoeletronicoservice/api/timesheets';

  constructor(protected http: HttpClient) {}

  create(timesheet: ITimesheet): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(timesheet);
    return this.http
      .post<ITimesheet>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(timesheet: ITimesheet): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(timesheet);
    return this.http
      .put<ITimesheet>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ITimesheet>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ITimesheet[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(timesheet: ITimesheet): ITimesheet {
    const copy: ITimesheet = Object.assign({}, timesheet, {
      weekday: timesheet.weekday && timesheet.weekday.isValid() ? timesheet.weekday.format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.weekday = res.body.weekday ? moment(res.body.weekday) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((timesheet: ITimesheet) => {
        timesheet.weekday = timesheet.weekday ? moment(timesheet.weekday) : undefined;
      });
    }
    return res;
  }
}
