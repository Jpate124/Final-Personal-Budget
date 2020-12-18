import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../_models/user/user.module';
import { AlertService } from '../_services/alert.service';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  addBudgetEntryForm: FormGroup;
  currentUser: number;

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

  constructor(private http: HttpClient,
              private formBuilder: FormBuilder,
              private alertService: AlertService) { }

  ngOnInit(): void {
    this.addBudgetEntryForm = this.formBuilder.group({
      date: [''],
      title: [''],
      budget: ['']
    });

    this.currentUser = JSON.parse(localStorage.getItem('currentUser')).id;
    this.getBudgetData();
  }

  getBudgetData() {
    const data = {userId: this.currentUser};
    this.http.post('http://localhost:3000/budget', data)
    .subscribe((res: any) => {

      for (let i = 0; i < res.length; i++) {
        this.dataSource.datasets[0].data[i] = res[i].budget;
        this.dataSource.labels[i] = res[i].title;
      }
    });
  }

  deleteBar() {
    if (document.contains(document.getElementById('barHolder'))){
      let obj = document.getElementById('barHolder');
      obj.parentNode.removeChild(obj);
    }
  }

  deletePie() {
    if (document.contains(document.getElementById('pieHolder'))){
      let obj = document.getElementById('pieHolder');
      obj.parentNode.removeChild(obj);
    }
  }

  createChart(): void {
    let ctx = document.getElementById('myChart');
    let myPieChart = new Chart(ctx, {
        type: 'pie',
        data: this.dataSource
    });
  }
  createBar(): void {
    let ctx = document.getElementById('myBar');
    let myBarChart = new Chart(ctx, {
      type: 'bar',
      data: this.dataSource
    });
  }

  openForm(): void {
    document.getElementById('addEntryForm').style.display = 'block';
  }

  closeForm(): void {
    document.getElementById('addEntryForm').style.display = 'none';
  }

  addEntry() {
    this.http.post('http://localhost:3000/add/budget', [this.addBudgetEntryForm.value, this.currentUser]).subscribe(
      data => {
          this.alertService.success('budgetAdded successful', true);
          this.getBudgetData();
          this.addBudgetEntryForm.reset();
          this.closeForm();
      },
      error => {
          this.alertService.error(error);
      });
  }

  openPie(): void {
    this.deleteBar();
    this.deletePie();
    let pieObj = document.getElementById('holder')
      .appendChild(document.createElement('DIV'));
    pieObj.setAttribute('id', 'pieHolder');
    let h1_node = document.createElement('H1');
    h1_node.appendChild(document.createTextNode('Pie Chart'));
    let canvas_node = document.createElement('CANVAS');
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
    let barObj = document.getElementById('holder')
      .appendChild(document.createElement('DIV'));
    barObj.setAttribute('id', 'barHolder');
    let h1_node = document.createElement('H1');
    h1_node.appendChild(document.createTextNode('Bar Chart'));
    let canvas_node = document.createElement('CANVAS');
    canvas_node.setAttribute('id', 'myBar');
    canvas_node.setAttribute('width', '400');
    canvas_node.setAttribute('height', '400');
    barObj.appendChild(h1_node);
    barObj.appendChild(canvas_node);
    this.createBar();
  }
}
