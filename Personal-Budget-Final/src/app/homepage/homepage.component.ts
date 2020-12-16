import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  public dataSource = {
    datasets: [
        {
            data: [],
            backgroundColor: [
                '#8E44AD',
                '#2C3E50',
                '#DAF7A6',
                '##FFC300',
                '#FF5733',
                '#C70039',
                '#900C3F',
                '#581845'
            ],
        }
    ],
    labels: []
  };

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/budget')
    .subscribe((res: any) => {

      for (var i = 0; i < res.myBudget.length; i++) {
        this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
        this.dataSource.labels[i] = res.myBudget[i].title;
      }


    });
  }
  deleteBar() {
    if(document.contains(document.getElementById('barHolder'))){
      var obj = document.getElementById('barHolder');
      obj.parentNode.removeChild(obj);
    }
  }

  deletePie() {
    if(document.contains(document.getElementById('pieHolder'))){
      var obj = document.getElementById('pieHolder');
      obj.parentNode.removeChild(obj);
    }
  }

  createChart(): void {
    var ctx = document.getElementById('myChart');
    var myPieChart = new Chart(ctx, {
        type: 'pie',
        data: this.dataSource
    });
  }
  createBar(): void {
    var ctx = document.getElementById('myBar');
    var myBarChart = new Chart(ctx, {
      type: 'bar',
      data: this.dataSource
    });
  }

  openForm(): void {
    document.getElementById('myForm').style.display = 'block';
  }

  closeForm(): void {
    document.getElementById('myForm').style.display = 'none';
  }

  openPie(): void {
    this.deleteBar();
    this.deletePie();
    var pieObj = document.getElementById('holder')
      .appendChild(document.createElement('DIV'));
    pieObj.setAttribute('id', 'pieHolder');
    var h1_node = document.createElement('H1');
    h1_node.appendChild(document.createTextNode('Pie Chart'));
    var canvas_node = document.createElement('CANVAS');
    canvas_node.setAttribute('id', 'myChart');
    canvas_node.setAttribute('width', '400');
    canvas_node.setAttribute('height', '400');
    pieObj.appendChild(h1_node);
    pieObj.appendChild(canvas_node);
    this.createChart();
  }

  openBar(): void {
    this.deletePie();
    this.deleteBar();
    var barObj = document.getElementById('holder')
      .appendChild(document.createElement('DIV'));
    barObj.setAttribute('id', 'barHolder');
    var h1_node = document.createElement('H1');
    h1_node.appendChild(document.createTextNode('Bar Chart'));
    var canvas_node = document.createElement('CANVAS');
    canvas_node.setAttribute('id', 'myBar');
    canvas_node.setAttribute('width', '400');
    canvas_node.setAttribute('height', '400');
    barObj.appendChild(h1_node);
    barObj.appendChild(canvas_node);
    this.createBar();
  }
}
