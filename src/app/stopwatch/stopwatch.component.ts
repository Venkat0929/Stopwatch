import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.css']
})
export class StopwatchComponent implements OnInit {
  private timer: any;
  private isRunning = false;
  private startTime: number = 0;
  private currentTime: number = 0;

  displayTime: string = '00:00:00';

  constructor() { }

  ngOnInit(): void {
  }

  start() {
    if (!this.isRunning) {
      // Start timer
      this.startTime = Date.now() - this.currentTime;
      this.timer = setInterval(() => {
        this.updateDisplay();
      }, 1000);
      this.isRunning = true;
    }
  }

  stop() {
    if (this.isRunning) {
      // Pause timer
      clearInterval(this.timer);
      this.isRunning = false;
    }
  }

  reset() {
    clearInterval(this.timer);
    this.isRunning = false;
    this.currentTime = 0;
    this.displayTime = '00:00:00';
  }

  updateDisplay() {
    this.currentTime = Date.now() - this.startTime;
    const hours = Math.floor(this.currentTime / 3600000);
    const minutes = Math.floor((this.currentTime % 3600000) / 60000);
    const seconds = Math.floor((this.currentTime % 60000) / 1000);

    // Format hours, minutes, and seconds with leading zeros
    const fhrs = this.rnum(hours);
    const fmins = this.rnum(minutes);
    const fsec = this.rnum(seconds);

    this.displayTime = `${fhrs}:${fmins}:${fsec}`;
  }
  rnum(num: number): string {
    return num.toString().padStart(2, '0');
  }
}
