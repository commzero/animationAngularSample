import { Component, ViewChild, ElementRef, OnInit, NgZone } from '@angular/core';
import { Square } from './square';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

// this small app is a practice from https://blog.angularindepth.com/how-to-get-started-with-canvas-animations-in-angular-2f797257e5b4

export class AppComponent implements OnInit {
  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D;
  requestId;
  interval;
  squares: Square[] = [];

  constructor(private ngZone: NgZone) {}

  ngOnInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.ctx.fillStyle = 'red';
    this.ngZone.runOutsideAngular(() => this.tick());
    setInterval(() => {
      this.tick();
    }, 200);
  }

  tick() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.squares.forEach((square: Square) => {
      square.moveRight();
    });
    this.requestId = requestAnimationFrame(() => this.tick);
  }

  play() {
    const square = new Square(this.ctx);
    this.squares = this.squares.concat(square);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
    cancelAnimationFrame(this.requestId);
  }
}
