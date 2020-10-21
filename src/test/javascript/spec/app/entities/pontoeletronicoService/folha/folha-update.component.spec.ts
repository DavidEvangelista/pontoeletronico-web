import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { PontoeletronicoWebTestModule } from '../../../../test.module';
import { FolhaUpdateComponent } from 'app/entities/pontoeletronicoService/folha/folha-update.component';
import { FolhaService } from 'app/entities/pontoeletronicoService/folha/folha.service';
import { Folha } from 'app/shared/model/pontoeletronicoService/folha.model';

describe('Component Tests', () => {
  describe('Folha Management Update Component', () => {
    let comp: FolhaUpdateComponent;
    let fixture: ComponentFixture<FolhaUpdateComponent>;
    let service: FolhaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PontoeletronicoWebTestModule],
        declarations: [FolhaUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(FolhaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FolhaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FolhaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Folha(123);
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
        const entity = new Folha();
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
