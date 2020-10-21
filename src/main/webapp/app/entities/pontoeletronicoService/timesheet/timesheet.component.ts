import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITimesheet } from 'app/shared/model/pontoeletronicoService/timesheet.model';
import { TimesheetService } from './timesheet.service';
import { TimesheetDeleteDialogComponent } from './timesheet-delete-dialog.component';

@Component({
  selector: 'jhi-timesheet',
  templateUrl: './timesheet.component.html',
})
export class TimesheetComponent implements OnInit, OnDestroy {
  timesheets?: ITimesheet[];
  eventSubscriber?: Subscription;

  constructor(protected timesheetService: TimesheetService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.timesheetService.query().subscribe((res: HttpResponse<ITimesheet[]>) => (this.timesheets = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInTimesheets();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ITimesheet): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInTimesheets(): void {
    this.eventSubscriber = this.eventManager.subscribe('timesheetListModification', () => this.loadAll());
  }

  delete(timesheet: ITimesheet): void {
    const modalRef = this.modalService.open(TimesheetDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.timesheet = timesheet;
  }
}
