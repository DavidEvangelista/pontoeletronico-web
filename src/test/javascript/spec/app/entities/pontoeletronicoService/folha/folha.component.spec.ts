import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PontoeletronicoWebTestModule } from '../../../../test.module';
import { FolhaComponent } from 'app/entities/pontoeletronicoService/folha/folha.component';
import { FolhaService } from 'app/entities/pontoeletronicoService/folha/folha.service';
import { Folha } from 'app/shared/model/pontoeletronicoService/folha.model';

describe('Component Tests', () => {
  describe('Folha Management Component', () => {
    let comp: FolhaComponent;
    let fixture: ComponentFixture<FolhaComponent>;
    let service: FolhaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PontoeletronicoWebTestModule],
        declarations: [FolhaComponent],
      })
        .overrideTemplate(FolhaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FolhaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FolhaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Folha(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.folhas && comp.folhas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
