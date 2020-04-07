import { trigger, state, style, animate } from '@angular/animations';

export let popupInAnimation = [
  style({ height: '!' }),
  style({ transform: 'translateY(14%)' }),
  style({ opacity: '0' }),
  animate('200ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translateY(0%)', opacity: '1' }))
];

export let popupOutAnimation = [
  style({ height: '!' }),
  style({ transform: 'translateY(0%)', opacity: '1' }),
  animate('200ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translateY(10%)', opacity: '0' }))
];

export let popupOutAnimationStop = [
  style({ height: '!' }),
  style({ transform: 'translateY(14%)', opacity: '0' }),
  animate('200ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translateY(10%)', opacity: '0' }))
];

export let fadeInAnimation = [
  style({ opacity: '0' }),
  animate('250ms', style({ opacity: '1' }))
];

export let fadeOutAnimation = [
  style({ opacity: '1' }),
  animate('250ms', style({ opacity: '0' }))
];

export let fadeInAnimationEpisodes = [
  style({ opacity: '0' }),
  animate('250ms', style({ opacity: '1' }))
];

export let slowFadeOutAnimation = [
  style({ opacity: '1' }),
  animate('1500ms', style({ opacity: '0' }))
];

// border animation triggers 
export let errorBorderAnimationTrigger =
  trigger('inputBorder', [
    state('open', style({
      // borderBottomColor:
      backgroundPosition: 'right bottom',
    })),
    state('closed', style({
      backgroundPosition: 'left bottom',
      color: '#E45D5D',
      fill: '#E45D5D',
    })),
  ]);

export let animationEnteringData = [
  style({ height: '!' }),
  style({ transform: 'translateX(-100%)' }),
  style({ opacity: '0' }),
  animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(0%)', opacity: 1 }))
];

export let animationLeavingData = [
  style({ height: '!' }),
  style({ transform: 'translateX(0%)' }),
  style({ opacity: '1' }),
  animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(-100%)', opacity: 0 }))
];

export let animationEnteringData2 = [
  style({ height: '!' }),
  style({ transform: 'translateX(100%)' }),
  style({ opacity: '0' }),
  animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(0%)', opacity: '1' }))
];

export let animationLeavingData2 = [
  style({ height: '!' }),
  style({ transform: 'translateX(0%)', opacity: '1' }),
  animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(100%)', opacity: '0' }))
];

export let animationLeavingDataStop = [
  style({ height: '!' }),
  style({ opacity: '1' }),
  animate('100ms cubic-bezier(.35,0,.25,1)', style({}))
];

export let animationTopTraslateY = [
  style({ height: '!' }),
  style({ transform: 'translateY(30px)', opacity: '0' }),
  animate('300ms cubic-bezier(.42,0,.58,1)', style({ transform: 'translateY(0%)', opacity: '1' }))
];

export let animationBottomTraslateY = [
  style({ height: '!' }),
  style({ transform: 'translateY(0px)', opacity: '1' }),
  animate('300ms cubic-bezier(.42,0,.58,1)', style({ transform: 'translateY(30px)', opacity: '0' }))
];

export let animationTopTraslateYPopUp = [
  style({ height: '!' }),
  style({ transform: 'translateY(100%)' }),
  animate('300ms cubic-bezier(.42,0,.58,1)', style({ transform: 'translateY(0%)' }))
];

export let animationBottomTraslateYPopUp = [
  style({ height: '!' }),
  style({ transform: 'translateY(0%)' }),
  animate('300ms cubic-bezier(.42,0,.58,1)', style({ transform: 'translateY(100%)' }))
];

export let animationDataStopHidden = [
  style({ height: '!' }),
  style({ opacity: '0' }),
  animate('100ms cubic-bezier(.35,0,.25,1)', style({ opacity: '0' }))
];

export let animationTopTraslateYAlert = [
  style({ height: '!' }),
  style({ transform: 'translateY(150%)' }),
  animate('300ms cubic-bezier(0,0,.58,1)', style({ transform: 'translateY(0%)' }))
];
export let animationBottomTraslateYAlert = [
  style({ height: '!' }),
  style({ transform: 'translateY(0%)', }),
  animate('300ms cubic-bezier(0,0,.58,1)', style({ transform: 'translateY(150%)' }))
];

export let animationOpacitiOne = [
  style({ height: '!' }),
  style({ opacity: '0', }),
  animate('300ms cubic-bezier(0,0,.58,1)', style({ opacity: '1' }))
];

export let animationOpacitiZero = [
  style({ height: '!' }),
  style({ opacity: '1', }),
  animate('300ms cubic-bezier(0,0,.58,1)', style({ opacity: '0' }))
];

export let animationScaleInModal = [
  style({ height: '!' }),
  style({ transform: 'translateY(40px) scale(1.1)' }),
  // style({ transform:  'scale(1.1)'}),
  style({ opacity: '0' }),
  animate('300ms cubic-bezier(0,0,.58,1)', style({ transform: 'translateY(0px) scale(1)', opacity: 1 }))
];

export let animationScaleOutModal = [
  style({ height: '!' }),
  style({ transform: 'translateY(0)' }),
  style({ transform: 'scale(1)' }),
  animate('300ms cubic-bezier(0,0,.58,1)', style({ transform: 'translateY(40px) scale(1.1)', opacity: 0 }))
];

export let animationButtonOpacity = [
  style({ height: '!' }),
  // style({ transform: 'translateY(40px) scale(1.1)'}),
  style({ transform: 'translateY(30%)' }),
  style({ opacity: '0' }),
  animate('300ms cubic-bezier(0,0,.58,1)', style({ transform: 'translateY(0%)', opacity: 1 }))
];

export let animationButtonOpacityLeave = [
  style({ height: '!' }),
  // style({ transform: 'translateY(40px) scale(1.1)'}),
  style({ transform: 'translateY(0%)' }),
  style({ opacity: '1' }),
  animate('300ms cubic-bezier(0,0,.58,1)', style({ transform: 'translateY(-30%)', opacity: 0 }))
];

export let animationButtonOpacityStop = [
  style({ height: '!' }),
  // style({ transform: 'translateY(40px) scale(1.1)'}),
  style({ transform: 'translateY(0%)' }),
  style({ opacity: '1' }),
  animate('0ms cubic-bezier(0,0,.58,1)', style({ transform: 'translateY(0%)', opacity: 1 }))
];

export let animationButtonOpacityBack = [
  style({ height: '!' }),
  // style({ transform: 'translateY(40px) scale(1.1)'}),
  style({ transform: 'translateY(0%)' }),
  style({ opacity: '1' }),
  animate('300ms cubic-bezier(0,0,.58,1)', style({ transform: 'translateY(30%)', opacity: 0 }))
];

export let animationButtonOpacityBackTop = [
  style({ height: '!' }),
  style({ transform: 'translateY(-30%)' }),
  style({ opacity: '1' }),
  animate('300ms cubic-bezier(0,0,.58,1)', style({ transform: 'translateY(0%)', opacity: 1 }))
];

export let animationTraslateWindow = [
  style({ height: '!' }),
  style({ transform: 'translateY(-30%)' }),
  style({ opacity: '1' }),
  animate('300ms cubic-bezier(0,0,.58,1)', style({ transform: 'translateY(0%)', opacity: 1 }))
];


