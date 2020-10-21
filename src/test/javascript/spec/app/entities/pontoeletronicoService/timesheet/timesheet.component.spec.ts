import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PontoeletronicoWebTestModule } from '../../../../test.module';
import { TimesheetComponent } from 'app/entities/pontoeletronicoService/timesheet/timesheet.component';
import { TimesheetService } from 'app/entities/pontoeletronicoService/timesheet/timesheet.service';
import { Timesheet } from 'app/shared/model/pontoeletronicoService/timesheet.model';

describe('Component Tests', () => {
  describe('Timesheet Management Component', () => {
    let comp: TimesheetComponent;
    let fixture: ComponentFixture<TimesheetComponent>;
    let service: TimesheetService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PontoeletronicoWebTestModule],
        declarations: [TimesheetComponent],
      })
        .overrideTemplate(TimesheetComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TimesheetComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TimesheetService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Timesheet(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.timesheets && comp.timesheets[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
