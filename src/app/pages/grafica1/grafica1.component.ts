import { Component, OnInit } from '@angular/core';
import { ChartData, ChartEvent, ChartType, Color } from 'chart.js';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component implements OnInit {


  labels1 : string[] =  [ 'Hola', 'Manuel', 'Gomez' ];
  public data1:ChartData<'doughnut'> = {
    labels: this.labels1,
    datasets: [{ data: [ 33, 77, 100 ]}]
  }

  labels3 : string[] =  [ 'Basico', 'Intermedio', 'Avanzado' ];
  public data3:ChartData<'doughnut'> = {
    labels: this.labels3,
    datasets: [{ data: [ 70, 20, 10 ]}]
  }

  constructor() { }

  ngOnInit(): void {
  }

  // // Doughnut
  // public doughnutChartLabels: string[] = [ 'Download Sales', 'In-Store Sales', 'Mail-Order Sales' ];
  // public doughnutChartData: ChartData<'doughnut'> = {
  //   labels: this.doughnutChartLabels,
  //   datasets: [
  //     {
  //       data: [ 350, 450, 100 ],
  //       backgroundColor: ['#6857e6','#009FEE','#F02059'],
  //       hoverBackgroundColor: ['#6857e6','#009FEE','#F02059'],
  //       hoverBorderColor:['#6857e6','#009FEE','#F02059']
  //     }
  //   ]
  // };
  // public doughnutChartType: ChartType = 'doughnut';

  // // events
  // public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
  //   console.log(event, active);
  // }

  // public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
  //   console.log(event, active);
  // }

}
