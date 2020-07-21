import { Component, OnInit } from '@angular/core';
import { Calender } from './calender.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'calender-app';
  timeslot = [];

  ngOnInit() {
    window['layOutDay'] = this.layOutDay.bind(this);
    if (localStorage.getItem('timeslot')) {
      this.timeslot = JSON.parse(localStorage.getItem('timeslot'));
    }
  }

  layOutDay(events: Calender[]): void {
    this.clearData();
    this.createTimeSlot(events);
  }

  createTimeSlot(events) {
    let streak = 0;
    //let f_half = 0;
    events.forEach((event, index) => {
      if ((index < events.length - 1 && events[index + 1].start < event.end)
        || (index === events.length - 1 && event.start < events[index - 1].end)
        //{shoul be remove in order to fix code}|| (f_half > 0 && events[index + 1].start > event.end)
        || (index > 0 && index < events.length - 1 && event.start < events[index - 1].end)) {

        if (streak % 2 === 0) {
         // f_half = 1;
          streak++;
          this.timeslot.push({ width: "45%", ev: event.start, height: (event.end - event.start), left: "0px" });
        } else {
         // f_half = 0;
          streak++;
          this.timeslot.push({ width: "45%", ev: event.start, height: (event.end - event.start), left: "50%" });
        }
      } else {
       // f_half = 0;
        this.timeslot.push({ width: "95%%", ev: event.start, height: (event.end - event.start), left: "0px" });
      }
    });
    localStorage.setItem('timeslot', JSON.stringify(this.timeslot));
    window.location.reload();
  }

  clearData() {
    this.timeslot.length = 0;
    localStorage.removeItem('timeslot');
  }
}