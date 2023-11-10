import {
  Directive,
  HostBinding,
  HostListener,
  Input,
} from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

@Directive({
  selector: '[isViewerDisabled]',
  providers: [MatTooltip],
})
export class DisabledViewerDirective {
  @Input() viewerTooltip = '';
  @Input() isViewerDisabled = false;

  constructor(
    private tooltip: MatTooltip,
  ) {}
  isDisabled = false;

  @HostBinding('style.pointer-events')
  pointerEvents = 'all';

  @HostListener('mouseover') mouseover() {
    if (this.isViewerDisabled) {
      this.tooltip.message = this.viewerTooltip;
      this.tooltip.show();
    }
  }
  @HostListener('mouseleave') mouseleave() {
    this.tooltip.hide();
  }

  @HostBinding('style.cursor')
  get cursorStyle() {
    return this.isViewerDisabled ? 'not-allowed' : 'default';
  }
}
