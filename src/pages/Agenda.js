/* eslint-disable */
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { setSubscriptions } from '../slices/subscriptionSlice';
import { GetsubsResponse } from '../services/Service';

const locales = {
  'en-US': require('date-fns'),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const Agenda = () => {
  const { SubscriptionData } = useSelector((state) => state.subscription);
  function createFile(e) {
    // let date = new Date(e.start).toISOString().substring(0, 10).replaceAll("-", "") + "T" + new Date(e.start).getHours() + new Date(e.start).getMinutes() + new Date(e.start).getSeconds() + "Z";

    let date = new Date(e.start).toISOString().substring(0, 10).replaceAll('-', '');
    var eventDate = {
        start: date,
        end: date,
      },
      summary = e.title,
      description = e.desc;
    var link = document.querySelector('#downloadLink');
    link.href = makeIcsFile(eventDate, summary, description);
    link.click();
  }

  var icsFile = null;

  function makeIcsFile(date, summary, description) {
    console.log(summary, description);
    var test =
      'BEGIN:VCALENDAR\n' +
      'CALSCALE:GREGORIAN\n' +
      'METHOD:PUBLISH\n' +
      'PRODID:-//Test Cal//EN\n' +
      'VERSION:2.0\n' +
      'BEGIN:VEVENT\n' +
      'UID:test-1\n' +
      'DTSTART:' +
      date.start +
      '\n' +
      'DTEND:' +
      date.end +
      '\n' +
      'SUMMARY:' +
      summary +
      '\n' +
      'DESCRIPTION:' +
      description +
      '\n' +
      'END:VEVENT\n' +
      'END:VCALENDAR';
    console.log(test);
    var data = new File([test], { type: 'text/plain' });

    if (icsFile !== null) {
      window.URL.revokeObjectURL(icsFile);
    }

    icsFile = window.URL.createObjectURL(data);
    console.log(icsFile);

    return icsFile;
  }

  const saveIcs = (e) => {
    console.log('dd ============ ', e);
    createFile(e);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    GetsubsResponse()
      .then((res) => {
        if (res.data.success === true) {
          dispatch(setSubscriptions({ subscriptions: res.data.data }));
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          console.log(err);
        }
      });
  }, []);

  const eventData = SubscriptionData.map((val) => {
    return {
      title: val.subscriptionName,
      start: new Date(val.nextBilling),
      end: new Date(val.nextBilling),
      desc: `Your ${val.subscriptionName} subscription is about to expire today`,
      allDay: true,
    };
  });

  return (
    <div className="calendars">
      <a style={{ display: 'none' }} href="" id="downloadLink" download="event.ics"></a>
      <div>
        <Calendar
          // events={[
          //   {
          //     id: 0,
          //     title: "Testing Agenda",
          //     start: new Date(2022, 11, 28, 14, 0, 0),
          //     end: new Date(2022, 11, 28, 16, 0, 0),
          //   },
          // ]}
          events={eventData}
          onSelectEvent={(e) => saveIcs(e)}
          defaultDate={new Date()}
          localizer={localizer}
          style={{ height: 700 }}
        />
      </div>
    </div>
  );
};

export default Agenda;
