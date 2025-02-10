import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../service/api.service';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: any = {};
  isSidebarOpen: Boolean = true;
  colWidthNav: string = 'col-span-8';
  userCount: Number = 0;
  productCount: Number = 0;
  orderCount: Number = 0;
  messageCount: Number = 0;
  date: Date = new Date();

  visible: boolean = false;
  adminDetails: any = {};

  constructor(private router: Router, private api: ApiService) {
    if (localStorage.getItem('chart')) {
      let chartData = JSON.parse(localStorage.getItem('chart') || '');
      this.chartOptions = {
        chart: {
          type: 'pie',
        },
        title: {
          text: 'Analysis of Products Count based on Category',
        },
        legend: {
          enabled: false,
        },
        credits: {
          enabled: false,
        },
        tooltip: {
          headerFormat: '',
          pointFormat:
            '<span style="color:{point.color}">\u25cf</span> ' +
            '{point.name}: <b>{point.percentage:.1f}%</b>',
        },
        accessibility: {
          point: {
            valueSuffix: '%',
          },
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            borderWidth: 2,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b><br>{point.percentage:.2f}%',
              distance: 20,
            },
          },
        },
        series: [
          {
            // Disable mouse tracking on load, enable after custom animation
            enableMouseTracking: false,
            animation: {
              duration: 2000,
            },
            colorByPoint: true,
            data: chartData,
          },
        ],
      };
    }
  }

  ngOnInit() {
    this.initCustomPieAnimation();
    this.getAdminDetails();
    this.getUserCount();
    this.getMessageCount();
    this.getProductCount();
    this.getOrderCount();
  }

  showDialog() {
    this.visible = true;
  }

  close() {
    this.visible = false;
  }

  editAdminDetails() {
    this.api.updateAdminDetailsApi(this.adminDetails).subscribe((res: any) => {
      alert('Admin Details Updated');
      this.visible = false;
    });
  }

  private initCustomPieAnimation() {
    (function (H: any) {
      H.seriesTypes.pie.prototype.animate = function (init: any) {
        const series = this,
          chart = series.chart,
          points = series.points,
          { animation } = series.options,
          { startAngleRad } = series;

        function fanAnimate(point: any, startAngleRad: any) {
          const graphic = point.graphic,
            args = point.shapeArgs;

          if (graphic && args) {
            graphic
              .attr({
                start: startAngleRad,
                end: startAngleRad,
                opacity: 1,
              })
              .animate(
                {
                  start: args.start,
                  end: args.end,
                },
                {
                  duration: animation.duration / points.length,
                },
                function () {
                  if (points[point.index + 1]) {
                    fanAnimate(points[point.index + 1], args.end);
                  }
                  if (point.index === series.points.length - 1) {
                    series.dataLabelsGroup.animate(
                      { opacity: 1 },
                      void 0,
                      function () {
                        points.forEach((point: any) => {
                          point.opacity = 1;
                        });
                        series.update({ enableMouseTracking: true }, false);
                        chart.update({
                          plotOptions: {
                            pie: {
                              innerSize: '40%',
                              borderRadius: 8,
                            },
                          },
                        });
                      }
                    );
                  }
                }
              );
          }
        }

        if (init) {
          points.forEach((point: any) => {
            point.opacity = 0;
          });
        } else {
          fanAnimate(points[0], startAngleRad);
        }
      };
    })(Highcharts);
  }

  sidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.colWidthNav = this.isSidebarOpen ? 'col-span-8' : 'col-span-9';
  }

  logout() {
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigateByUrl('/');
  }

  getUserCount() {
    this.api.getAllUserApi().subscribe((res: any) => {
      this.userCount = res.length;
    });
  }

  getProductCount() {
    this.api.getAllProductsApi().subscribe((res: any) => {
      this.productCount = res.length;
    });
  }

  getMessageCount() {
    this.api.getAllMessageApi().subscribe((res: any) => {
      this.messageCount = res.length;
    });
  }
  getOrderCount() {
    this.api.getAllOrderApi().subscribe((res: any) => {
      this.orderCount = res.length;
    });
  }

  getAdminDetails() {
    this.api.getAdminDetailsApi().subscribe((res: any) => {
      this.adminDetails = res;
    });
  }
}
