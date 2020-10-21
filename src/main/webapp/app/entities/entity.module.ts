import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'timesheet',
        loadChildren: () =>
          import('./pontoeletronicoService/timesheet/timesheet.module').then(m => m.PontoeletronicoServiceTimesheetModule),
      },
      {
        path: 'project',
        loadChildren: () => import('./pontoeletronicoService/project/project.module').then(m => m.PontoeletronicoServiceProjectModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class PontoeletronicoWebEntityModule {}
