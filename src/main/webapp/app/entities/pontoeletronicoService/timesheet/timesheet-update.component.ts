import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ITimesheet, Timesheet } from 'app/shared/model/pontoeletronicoService/timesheet.model';
import { TimesheetService } from './timesheet.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'jhi-timesheet-update',
  templateUrl: './timesheet-update.component.html',
})
export class TimesheetUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];
  weekdayDp: any;

  editForm = this.fb.group({
    id: [],
    weekday: [],
    goLunch: [],
    backLunch: [],
    checkin: [],
    checkout: [],
    total: [],
    userId: [],
  });

  constructor(
    protected timesheetService: TimesheetService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ timesheet }) => {
      this.updateForm(timesheet);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));
    });
  }

  updateForm(timesheet: ITimesheet): void {
    this.editForm.patchValue({
      id: timesheet.id,
      weekday: timesheet.weekday,
      goLunch: timesheet.goLunch,
      backLunch: timesheet.backLunch,
      checkin: timesheet.checkin,
      checkout: timesheet.checkout,
      total: timesheet.total,
      userId: timesheet.userId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const timesheet = this.createFromForm();
    if (timesheet.id !== undefined) {
      this.subscribeToSaveResponse(this.timesheetService.update(timesheet));
    } else {
      this.subscribeToSaveResponse(this.timesheetService.create(timesheet));
    }
  }

  private createFromForm(): ITimesheet {
    return {
      ...new Timesheet(),
      id: this.editForm.get(['id'])!.value,
      weekday: this.editForm.get(['weekday'])!.value,
      goLunch: this.editForm.get(['goLunch'])!.value,
      backLunch: this.editForm.get(['backLunch'])!.value,
      checkin: this.editForm.get(['checkin'])!.value,
      checkout: this.editForm.get(['checkout'])!.value,
      total: this.editForm.get(['total'])!.value,
      userId: this.editForm.get(['userId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITimesheet>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IUser): any {
    return item.id;
  }
}
