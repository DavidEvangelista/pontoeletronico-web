import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { TimesheetService } from 'app/entities/pontoeletronicoService/timesheet/timesheet.service';
import { ITimesheet, Timesheet } from 'app/shared/model/pontoeletronicoService/timesheet.model';

describe('Service Tests', () => {
  describe('Timesheet Service', () => {
    let injector: TestBed;
    let service: TimesheetService;
    let httpMock: HttpTestingController;
    let elemDefault: ITimesheet;
    let expectedResult: ITimesheet | ITimesheet[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(TimesheetService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Timesheet(0, currentDate, 0, 0, 0, 0, 0);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            weekday: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Timesheet', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            weekday: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            weekday: currentDate,
          },
          returnedFromService
        );

        service.create(new Timesheet()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Timesheet', () => {
        const returnedFromService = Object.assign(
          {
            weekday: currentDate.format(DATE_FORMAT),
            goLunch: 'BBBBBB',
            backLunch: 'BBBBBB',
            checkin: 'BBBBBB',
            checkout: 'BBBBBB',
            total: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            weekday: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Timesheet', () => {
        const returnedFromService = Object.assign(
          {
            weekday: currentDate.format(DATE_FORMAT),
            goLunch: 'BBBBBB',
            backLunch: 'BBBBBB',
            checkin: 'BBBBBB',
            checkout: 'BBBBBB',
            total: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            weekday: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Timesheet', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
