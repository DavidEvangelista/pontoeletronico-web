import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITimesheet, Timesheet } from 'app/shared/model/pontoeletronicoService/timesheet.model';
import { TimesheetService } from './timesheet.service';
import { TimesheetComponent } from './timesheet.component';
import { TimesheetDetailComponent } from './timesheet-detail.component';
import { TimesheetUpdateComponent } from './timesheet-update.component';

@Injectable({ providedIn: 'root' })
export class TimesheetResolve implements Resolve<ITimesheet> {
  constructor(private service: TimesheetService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITimesheet> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((timesheet: HttpResponse<Timesheet>) => {
          if (timesheet.body) {
            return of(timesheet.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Timesheet());
  }
}

export const timesheetRoute: Routes = [
  {
    path: '',
    component: TimesheetComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Timesheets',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TimesheetDetailComponent,
    resolve: {
      timesheet: TimesheetResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Timesheets',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TimesheetUpdateComponent,
    resolve: {
      timesheet: TimesheetResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Timesheets',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TimesheetUpdateComponent,
    resolve: {
      timesheet: TimesheetResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Timesheets',
    },
    canActivate: [UserRouteAccessService],
  },
];
