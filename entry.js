import React from 'react'
import ReactDOM from 'react-dom'
import DailyCalendar from './src/calendars/DailyCalendar.jsx'
import MonthlyCalendar from './src/calendars/MonthlyCalendar.jsx'
import WeeklyChart from './src/charts/WeeklyChart.jsx'
import ICAL from 'ical.js'
import { isNull } from 'lodash'

function readLocalFile(path, callback) {
  let xhr = new XMLHttpRequest()
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status == 200) {
      callback(xhr.response)
    }
  }
  xhr.open('GET', path, true);
  xhr.send()
}

function readRemoteFile(path, callback) {
  let xhr = new XMLHttpRequest()
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status == 200) {
      callback(xhr.response)
    }
  }
  xhr.open('GET', path, true);
  xhr.send()
}

function parseICalData(data) {
  let parsed = ICAL.parse(data)
  let component = new ICAL.Component(parsed)
  let vevents = component.getAllSubcomponents("vevent")
  let events = vevents.map((vevent) => new ICAL.Event(vevent))
  let cevents = []


  events.map(function(event) {
    if (!isNull(event.startDate) && !isNull(event.endDate)) {
      let summary = event.summary
      let startDate = event.startDate.toJSDate()
      let endDate = event.endDate.toJSDate()
      cevents.push([startDate, endDate, summary])
    }
  })

  return cevents
}

let xevents = [
  [9, 9.5, 'Email'], // start hour, end hour, event descriptions (comma-delimited)
  [10, 11, 'Meeting'],
  [11, 11.75, 'Work'],
  [12, 13, 'Lunch'],
  [13, 15, 'Meeting'],
  [15, 16, 'Work'],
  [16, 17, 'Email,Coffee'],
  [17, 17.5, 'Commute,Reading'],
  [18, 19, 'Exercise,Music'],
  [19.75, 20, 'Dinner,Netflix'],
  [20, 21, 'Walk Dog']
];

// https://calendar.google.com/calendar/ical/steve%40bugs.me.uk/private-694ce54003434d1aab71429ca97a83f2/basic.ics

readLocalFile('basic.ics', function(response) {
  let ievents = parseICalData(response)

   ReactDOM.render(<DailyCalendar
                  events={ievents}
                   />, document.querySelector('#daily-calendar'))

  ReactDOM.render(<MonthlyCalendar
                    events={ievents}
                    year={2024}
                    month={9}
                    />, document.querySelector('#monthly-calendar'))

  let root = document.querySelector('#weekly-chart')
  let months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

  months.map(function(month) {
    let monthNode = document.createElement('div')
    root.appendChild(monthNode)
    ReactDOM.render(<WeeklyChart
                    events={ievents}
                    year={2024}
                    month={month}
                    />, monthNode)
  })

  //let yearNode = document.createElement('div')
  //root.appendChild(yearNode)
  //ReactDOM.render(<WeeklyChart
  //                 events={ievents}
  //                 year={2024}
  //                />, yearNode)
  })
