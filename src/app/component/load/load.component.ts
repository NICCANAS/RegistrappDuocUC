import { Component, OnInit } from '@angular/core';
import { AnimationOptions} from 'ngx-lottie';

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styleUrls: ['./load.component.scss'],
})
export class LoadComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

    //para archivos de la liberaria tipo lottie
    options: AnimationOptions = {
      path: '/assets/duoc.json',
      loop: false
    }

}
