import {computed, Injectable, signal} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root',
})
export class ScreenService {
  private isMobileSignal = signal(false);
  private isTabletSignal = signal(false);
  private isDesktopSignal = signal(false);

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.isMobileSignal.set(result.matches);
    });

    this.breakpointObserver.observe([Breakpoints.Tablet]).subscribe(result => {
      this.isTabletSignal.set(result.matches);
    });

    this.breakpointObserver.observe([Breakpoints.Web]).subscribe(result => {
      this.isDesktopSignal.set(result.matches);
    });
  }

  isMobile = this.isMobileSignal.asReadonly();
  isTablet = this.isMobileSignal.asReadonly();
  isDesktop = this.isMobileSignal.asReadonly();

  currentScreen = computed(() => {
    if (this.isMobile()) return 'mobile';
    if (this.isTablet()) return 'tablet';
    if (this.isDesktop()) return 'desktop';
    return 'unknown';
  });
}
