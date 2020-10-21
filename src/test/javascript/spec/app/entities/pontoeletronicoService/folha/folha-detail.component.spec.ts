import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PontoeletronicoWebTestModule } from '../../../../test.module';
import { FolhaDetailComponent } from 'app/entities/pontoeletronicoService/folha/folha-detail.component';
import { Folha } from 'app/shared/model/pontoeletronicoService/folha.model';

describe('Component Tests', () => {
  describe('Folha Management Detail Component', () => {
    let comp: FolhaDetailComponent;
    let fixture: ComponentFixture<FolhaDetailComponent>;
    const route = ({ data: of({ folha: new Folha(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PontoeletronicoWebTestModule],
        declarations: [FolhaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(FolhaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FolhaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load folha on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.folha).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
