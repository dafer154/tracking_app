import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-carousel-slider',
  templateUrl: './carousel-slider.component.html',
  styleUrls: ['./carousel-slider.component.scss']
})

export class CarouselSliderComponent implements AfterViewInit {

  ngAfterViewInit() {
    console.log('ME ESTAS VIENDO LA CARA');

  }

}
