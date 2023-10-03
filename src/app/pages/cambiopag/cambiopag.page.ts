import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cambiopag',
  templateUrl: './cambiopag.page.html',
  styleUrls: ['./cambiopag.page.scss'],
})
export class CambiopagPage implements OnInit {
  modalController: any;

  constructor(private router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['/log-in']);
    }, 3000);  //3s
  }

  //para archivos de la liberaria tipo lottie
  options: AnimationOptions = {
    path: '/assets/duoc.json'
  }

}