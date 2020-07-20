import { Component } from '@angular/core';

import { Calender } from './calender.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'calender-app';
  timeslot =  [];
  //streak: number = 0;
  //[{[start,end],width,left,height}]

  constructor(){
    window['layOutDay'] = this.layOutDay;
  }

  layOutDay(events: Calender[]): void{
    let streak = 0;
    let f_half = 0;
    for(let index=0;index < events.length;index++){
      if ((index < events.length - 1 && events[index + 1].start < events[index].end) || (index === events.length - 1 &&  events[index].start < events[index-1].end) || (f_half > 0 && events[index + 1].start > events[index].end)) {
    
        if (streak % 2 === 0) {
            f_half = 1;
            streak++;
            this.timeslot.push({width:"280px",ev:events[index].start,height:(events[index].end-events[index].start)-8,left:"0px"})
            //return (<TimeSlot width={'280px'} event={event} key={event.title}/>);
        } else {
            f_half = 0;
            streak++;
            this.timeslot.push({width:"280px",ev:events[index].start,height:(events[index].end-events[index].start)-8,left:"50%"})
            //return (<TimeSlot left={'50%'} width={'280px'} event={event} key={event.title}/>);
        }
    } else {
      f_half = 0;
      this.timeslot.push({width:"100%",ev:events[index].start,height:(events[index].end-events[index].start)-8,left:"0px"})
        //return (<TimeSlot width={'100%'} event={event} key={event.title}/>);
    }
  }
  console.log(this.timeslot)
  // this.events = events;
  
    // events.map((event, index) => {
    //   console.log("dd",this);
    //   if ((index < events.length - 1 && events[index + 1].start < event.end) || (index === events.length - 1 && streak > 0) || (streak > 0 && events[index + 1].start > event.end)) {
    //     console.log("dd",streak);
    //     if (streak % 2 === 0) {
    //         streak++;
    //         //return (<TimeSlot width={'280px'} event={event} key={event.title}/>);
    //     } else {
    //        streak++;
    //         //return (<TimeSlot left={'50%'} width={'280px'} event={event} key={event.title}/>);
    //     }
    // } else {
    //     //return (<TimeSlot width={'100%'} event={event} key={event.title}/>);
    // }
    // });
    //this.clearCalender();
    //validate for overlapses of time
    //if validated push in events

  }
  // clearCalender(): void{
  //   this.events = [];
  // }
}
