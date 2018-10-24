import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  isHome: boolean;
  isMobile: Observable<boolean> = this.breakpointObserver
    .observe([Breakpoints.Handset, Breakpoints.Tablet, Breakpoints.WebPortrait])
    //reakpoints.TabletPortrait, Breakpoints.TabletLandscape,
    .pipe(map(result => result.matches));

  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
  }

}
