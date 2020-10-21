import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITimesheet } from 'app/shared/model/pontoeletronicoService/timesheet.model';
import { TimesheetService } from './timesheet.service';

@Component({
  templateUrl: './timesheet-delete-dialog.component.html',
})
export class TimesheetDeleteDialogComponent {
  timesheet?: ITimesheet;

  constructor(protected timesheetService: TimesheetService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.timesheetService.delete(id).subscribe(() => {
      this.eventManager.broadcast('timesheetListModification');
      this.activeModal.close();
    });
  }
}
