import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'modal',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
})
export class PopupComponent implements OnInit {
  constructor(private el: ElementRef) {}
  ngOnInit() {
    console.log('test');
    this.el.nativeElement.addEventListener('click', () => {
      this.close();
    });
  }
  close() {
    this.el.nativeElement.classList.remove('sshow');
    this.el.nativeElement.classList.add('hhidden');
  }
}
