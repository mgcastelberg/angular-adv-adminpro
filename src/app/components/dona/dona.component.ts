import { Component, OnInit, Input } from '@angular/core';
import { ChartData, ChartEvent, ChartType } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() titulo: string = "Sin titulo";

  @Input('labels') doughnutChartLabels: string[] = [ 'Data1', 'Data2', 'Data3' ];
  @Input("dVenta") doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [ 350, 450, 100 ],
        backgroundColor: ['#7DD8D9','#D97D93','#77DA9A'],
        hoverBackgroundColor: ['#22D5D7','#D95373','#50D981'],
        hoverBorderColor:['#FFFFFF','#FFFFFF','#FFFFFF']
      },

    ]
  };

  public doughnutChartType: ChartType = 'doughnut';

  // events
  public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
