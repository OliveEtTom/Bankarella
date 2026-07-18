import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-landing-page',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
})
export class LandingPage implements OnInit {
  userEmail: string;
  constructor(private router: Router) {
    this.userEmail = '';
  }

  onNavigateToSimulation() {
    this.router.navigateByUrl('simulation');
  }

  onSubmitForm(form: NgForm) {
    console.log(form.value.userEmail);
  }

  ngOnInit() {
  }
}
