import { DOCUMENT } from '@angular/common';
import { Directive, HostListener, Inject, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

type MediaType = 'mobile' | 'desktop' | 'tablet';

enum MediaQueries {
  DESKTOP = 1024,
  TABLET = 768,
  MOBILE = 480,
}

type _Event<T> = Event & { target: T}

@Directive({
  selector: '[blogSwitchMedia]',
  standalone: true,
})
export class SwitchMediaDirective implements OnInit, OnDestroy {
  @Input('blogSwitchMedia') media: MediaType[] = [];

  private currentMedia$$ = new Subject<MediaType>();
  private destroy$$ = new Subject<void>();

  @HostListener('window:resize', ['$event'])
  onResize(event: _Event<Window>): void {
    const width = event.target?.innerWidth;
    if (width > MediaQueries.TABLET) {
      this.currentMedia$$.next('desktop');
      return;
    }
    if (width > MediaQueries.MOBILE) {
      this.currentMedia$$.next('tablet');
      return;
    }
    this.currentMedia$$.next('mobile');
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    @Inject(DOCUMENT) private document: Document,
  ) {}

  ngOnInit(): void {
    this.currentMedia$$
      .pipe(takeUntil(this.destroy$$))
      .subscribe((currentMedia: MediaType) => {
        this.viewContainer.clear();
        if (this.media.includes(currentMedia)) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainer.clear();
        }
      });
    this.document.defaultView?.dispatchEvent(new Event('resize'));
  }

  ngOnDestroy(): void {
    this.destroy$$.next();
    this.destroy$$.complete();
  }
}
