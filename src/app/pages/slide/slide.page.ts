import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.page.html',
  styleUrls: ['./slide.page.scss'],
})
export class SlidePage implements OnInit {

  constructor(private router:Router) { }

  nextPage(){
    this.router.navigate(['/cambiopag'])
  }

  ngOnInit() {
  }

}
