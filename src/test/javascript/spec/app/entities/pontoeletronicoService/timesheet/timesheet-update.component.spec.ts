import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { PontoeletronicoWebTestModule } from '../../../../test.module';
import { TimesheetUpdateComponent } from 'app/entities/pontoeletronicoService/timesheet/timesheet-update.component';
import { TimesheetService } from 'app/entities/pontoeletronicoService/timesheet/timesheet.service';
import { Timesheet } from 'app/shared/model/pontoeletronicoService/timesheet.model';

describe('Component Tests', () => {
  describe('Timesheet Management Update Component', () => {
    let comp: TimesheetUpdateComponent;
    let fixture: ComponentFixture<TimesheetUpdateComponent>;
    let service: TimesheetService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PontoeletronicoWebTestModule],
        declarations: [TimesheetUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(TimesheetUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TimesheetUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TimesheetService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Timesheet(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Timesheet();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
