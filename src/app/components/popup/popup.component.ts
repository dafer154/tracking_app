import { Component, OnInit, ContentChild, TemplateRef, Input, EventEmitter, Output, Renderer2, OnDestroy, Inject } from '@angular/core';
import { fadeInAnimation, fadeOutAnimation } from 'src/app/animations/animations';
import { transition, trigger } from '@angular/animations';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  animations: [
    trigger('myAnimationTrigger', [
      transition('* => 1', fadeInAnimation),
      transition('1 => *', fadeOutAnimation),
    ])
  ]
})
export class PopupComponent implements OnInit, OnDestroy {

  @ContentChild(TemplateRef) template: TemplateRef<any>;
  @Input() settings: any;
  @Output() exit = new EventEmitter<any>();
  public state: number;

  constructor(private rederer: Renderer2, @Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
    this.state = 1;
    this.rederer.addClass(this.document.body, 'unscroll');
  }

  public exitPopup(action: string): void {
    this.state = 0;
    setTimeout(() => {
      this.exit.emit(action);
    }, 250);
  }

  ngOnDestroy(): void {
    this.rederer.removeClass(this.document.body, 'unscroll');
  }

}
