import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PontoeletronicoWebSharedModule } from 'app/shared/shared.module';
import { TimesheetComponent } from './timesheet.component';
import { TimesheetDetailComponent } from './timesheet-detail.component';
import { TimesheetUpdateComponent } from './timesheet-update.component';
import { TimesheetDeleteDialogComponent } from './timesheet-delete-dialog.component';
import { timesheetRoute } from './timesheet.route';

@NgModule({
  imports: [PontoeletronicoWebSharedModule, RouterModule.forChild(timesheetRoute)],
  declarations: [TimesheetComponent, TimesheetDetailComponent, TimesheetUpdateComponent, TimesheetDeleteDialogComponent],
  entryComponents: [TimesheetDeleteDialogComponent],
})
export class PontoeletronicoServiceTimesheetModule {}
