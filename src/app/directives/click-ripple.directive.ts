import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appClickRipple]',
  standalone: true,
})
export class ClickRippleDirective {
  private lastRippleTime: number = 0;
  private debounceTime: number = 450; // 3 seconds in milliseconds

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  @HostListener('click', ['$event']) onClick(event: MouseEvent) {
    const currentTime = Date.now();
    if (currentTime - this.lastRippleTime >= this.debounceTime) {
      this.lastRippleTime = currentTime;
      this.createRipple(event);
    }
  }

  private createRipple(event: MouseEvent) {
    const numRipples = 3; // Number of ripples
    const delayBetweenRipples = 200; // Delay between each ripple (in milliseconds)

    for (let i = 0; i < numRipples; i++) {
      setTimeout(() => {
        const ripple = this.renderer.createElement('div');
        this.renderer.addClass(ripple, 'ripple');

        // Calculate position relative to the container
        const offsetX = event.offsetX;
        const offsetY = event.offsetY;

        this.renderer.setStyle(ripple, 'top', `${offsetY}px`);
        this.renderer.setStyle(ripple, 'left', `${offsetX}px`);
        this.renderer.appendChild(this.el.nativeElement, ripple);

        setTimeout(() => {
          this.renderer.removeChild(this.el.nativeElement, ripple);
        }, 500); // Remove the ripple after 500 milliseconds
      }, i * delayBetweenRipples); // Apply delay between each ripple
    }
  }
}
