/* eslint-disable */
import { useDispatch, useSelector } from 'react-redux';
import React, { Children, useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay, setMonth } from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { setSubscriptions } from '../slices/subscriptionSlice';
import { GetsubsResponse } from '../services/Service';
import Page from '../components/Page';
import moment from 'moment';
import styled from 'styled-components';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import { Box } from '@mui/system';
import { Card, Divider, Grid, List, ListItem, ListItemText, Typography } from '@mui/material';
import { useRef } from 'react';

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

const StyledWrapper = styled.div`
  .rbc-btn-group button {
    border-radius: 25px;
    background-color: #ffffff;
  }

  .rbc-toolbar button:focus {
    background-color: #3d71ff;
    color: #ffffff;
  }

  .rbc-toolbar button:active,
  .rbc-toolbar button.rbc-active {
    background-color: #3d71ff;
    color: #ffffff;
  }
  .rbc-month-row {
    margin-bottom: 10px;
  }
  .rbc-now {
    color: #ffffff;
  }
  .rbc-month-view {
    background: white;
  }

  .rbc-month-view .rbc-day-bg {
    border: 1px solid #3d71ff;
    margin-right: 10px;
  }
  .rbc-row-content {
    height: 100%;
    display: flex;
    flex-direction: column-reverse;
    margin: 5px 0 0 0;
  }
  .rbc-row-segment {
    padding: 0 1px 1px 8px;
  }
  .rbc-row-segment .rbc-event {
    width: calc(100% - 18px);
    border-radius: 25px;
  }

  .rbc-month-header {
    padding: 10px;
    border-radius: 25px;
    background: #7b9efd;
    margin-bottom: 15px;
    color: #ffffff;
  }

  .rbc-row-segment .rbc-event .rbc-event-content {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 14px;
    text-align: center;
    padding: 2px 0px;
  }

  .rbc-date-cell {
    padding-right: 15px;
  }

  .rbc-month-view .rbc-today {
    background-color: #3d71ff;
  }
  .rbc-off-range-bg {
    border: 1px solid #ccd0d6 !important;
    background-color: #ffffff;
  }
  .rbc-header,
  .rbc-month-view,
  .rbc-month-row {
    border: none;
  }
  .toolbar-group {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
`;

const Agenda = () => {
  const { SubscriptionData } = useSelector((state) => state.subscription);
  const [monthName, setMonthName] = useState(moment().month());
  const [labelName, setLabelName] = useState();

  const Calendarref = useRef();

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
    var data = new File([test], { type: 'text/plain' });

    if (icsFile !== null) {
      window.URL.revokeObjectURL(icsFile);
    }

    icsFile = window.URL.createObjectURL(data);
    return icsFile;
  }

  const saveIcs = (e) => {
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

  const eventStyleGetter = (event, start, end, isSelected) => {
    var current_date = moment().format('YYYY-MM-DD');
    var days = moment(event.end).diff(current_date, 'days');
    var backgroundColor = days > 0 ? '#54E1C2' : days === 0 ? '#FF7C95' : '#FF7C95';
    var style = {
      backgroundColor: backgroundColor,
      borderRadius: '10px',
      opacity: 0.8,
      color: '#fff',
      border: '0px',
      display: 'block',
    };
    return {
      style: style,
    };
  };

  return (
    <Page title="Calendar - SGI">
      <div className="calendars">
        <a style={{ display: 'none' }} href="" id="downloadLink" download="event.ics"></a>
        <StyledWrapper>
          <div className="rbc-toolbar">
            <Typography variant="h4" sx={{ fontSize: '40px', fontWeight: 700, color: '#3D71FF', mr: 5 }}>
              Calendar
            </Typography>
            <span className="rbc-btn-group">
              <button
                type="button"
                onClick={() => {
                  setMonthName(() => moment().month());
                  Calendarref.current?.props?.onNavigate(new Date());
                  Calendarref.current?.props?.onView('month');
                }}
              >
                Today
              </button>
              <button
                type="button"
                onClick={() => {
                  const t = moment(Calendarref.current?.props?.date).subtract(1, 'month').toDate();
                  Calendarref.current?.props?.onNavigate(t);
                  setMonthName(() => moment(t).month());
                  Calendarref.current?.props?.onView('month');
                }}
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => {
                  const t = moment(Calendarref.current?.props?.date).add(1, 'month').toDate();
                  Calendarref.current?.props?.onNavigate(t);
                  setMonthName(() => moment(t).month());
                  Calendarref.current?.props?.onView('month');
                }}
              >
                Next
              </button>
            </span>
            <span className="rbc-toolbar-label">
              <div className="toolbar-group">
                <PlayCircleFilledIcon
                  sx={{ color: '#3D71FF', transform: 'rotate(180deg)', marginRight: 2 }}
                  onClick={() => {
                    const view = Calendarref.current?.props?.view;                  
                    const t = moment(Calendarref.current?.props?.date).subtract(1, view).toDate();
                    Calendarref.current?.props?.onNavigate(t);
                    setMonthName(() => moment(t).month());
                  }}
                />
                {/* <>{moment(Calendarref.current?.props?.date).format('MMMM YYYY')}</> */}
                <>{labelName}</>
                <PlayCircleFilledIcon
                  sx={{ color: '#3D71FF', marginLeft: 2 }}
                  onClick={() => {
                    const view = Calendarref.current?.props?.view;
                    const t = moment(Calendarref.current?.props?.date).add(1, view).toDate();
                    Calendarref.current?.props?.onNavigate(t);
                    setMonthName(() => moment(t).month());
                  }}
                />
              </div>
            </span>
            <span className="rbc-btn-group">
              {Calendarref.current?.props?.views
                .filter((f, idx) => idx < Calendarref.current?.props?.views?.length - 1)
                .map((val, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      Calendarref.current?.props?.onView(val);
                    }}
                  >
                    {val.charAt(0).toUpperCase() + val.slice(1)}
                  </button>
                ))}
            </span>
          </div>

          <Grid container spacing={2} sx={{ bgcolor: '#fff', mt: 2 }}>
            <Grid item xs={0.4} />
            <Grid item xs={8.6}>
              <Box display="inline-block" sx={{ width: '100%' }} py={1}>
                <Calendar
                  ref={Calendarref}
                  events={eventData}
                  onSelectEvent={(e) => saveIcs(e)}
                  defaultDate={new Date()}
                  localizer={localizer}
                  style={{ height: 580 }}
                  eventPropGetter={eventStyleGetter}
                  components={{
                    toolbar: (props) => {
                      setLabelName(props.label);
                      return <></>;
                    },
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box display="inline-block" sx={{ height: '100%', width: '100%' }} paddingRight={2}>
                <Card
                  sx={{
                    padding: '10px',
                    borderRadius: '25px',
                    marginBottom: '15px',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  Notes
                </Card>
                <Box sx={{ height: '485px', border: 'solid 1px #ccc' }}>
                  <List sx={{ width: '100%', height: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    {SubscriptionData.filter((f) => moment(f.nextBilling).month() === monthName).map((val, idx) => {
                      return (
                        <div key={idx}>
                          <ListItem alignItems="flex-start">
                            <ListItemText
                              secondary={
                                <>
                                  {idx + 1}
                                  {'. '} Your{' '}
                                  <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                  >
                                    {val.subscriptionName}
                                  </Typography>{' '}
                                  subscription is about to expire on {moment(val.nextBilling).format('MM/DD/YYYY')}
                                </>
                              }
                            />
                          </ListItem>
                          <Divider variant="inset" sx={{ marginLeft: 0 }} />
                        </div>
                      );
                    })}
                  </List>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </StyledWrapper>
      </div>
    </Page>
  );
};

export default Agenda;
