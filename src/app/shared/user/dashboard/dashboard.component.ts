import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  date! : string;

  ngOnInit(): void {

    const today = new Date();
    this.date = today.toISOString().split('T')[0];
  }

}
