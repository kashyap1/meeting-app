import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cell from './Cell';
import getSlicedDates, { formatDataPerDate } from './dateUtils';
import CONSTANTS from '../../constants';
import css from './index.module.css';

const slicedDates = getSlicedDates();
export default function Calendar() {
  const dispatch = useDispatch();
  const header = CONSTANTS.DAYS.map((day) => (
    <div key={day} className={css.calendar__cell}>{day}</div>
  ));

  const { meetings, loggedInUser } = useSelector((state) => {
    const meeting = Object.values(state.meeting);
    return ({
      meetings: meeting.length ? formatDataPerDate(meeting) : [], loggedInUser: state.user.id
    });
  });

  useEffect(async () => {
    const data = await fetch(`${CONSTANTS.BASE_URL}meetings?userId=${loggedInUser}`)
      .then((res) => res.json());
    dispatch({ type: CONSTANTS.actionTypes.MEETINGS_LOADED, payload: data });
  }, []);

  const renderDates = slicedDates.map((dates) => (
    <div className={css.calendar__rows} key={dates}>
      {dates.map((date, i) => (<Cell cellInd={i} meeting={meetings} key={date} date={date} />))}
    </div>
  ));

  return (
    <article className={css.calendar}>
      <h2>Calendar</h2>
      <section className={css.calendar__container}>
        <div className={css.calendar__wrapper}>
          <div className={css.calendar__header}>
            {header}
          </div>
          <div className={css.calendar__body}>
            {renderDates}
          </div>
        </div>
      </section>
    </article>
  );
}
