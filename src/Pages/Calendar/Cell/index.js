import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../../../Components/Modal';
import CONSTANTS from '../../../constants';
import css from './index.module.css';

export default function Cell(props) {
  const modal = useRef(null);
  const { date, meeting, cellInd } = props;
  const navigate = useNavigate();
  const [d, m, y] = date.split('-');
  const day = parseInt(d, 10);
  const month = parseInt(m, 10);
  const year = parseInt(y, 10);
  const data = meeting[date];
  const {
    name, desc, attendees, dates
  } = data || {};
  let cls = data ? css['calendar__cell--highlighted'] : '';
  cls = [0, 6].includes(cellInd) ? `${cls} ${css.calendar__highlighted}` : cls;
  const DayStr = day === 1 ? `${CONSTANTS.MONTHS[month - 1]} ` : '';
  const dt = new Date();
  const currMonth = dt.getMonth();
  const currDate = dt.getDate();
  const currYear = dt.getFullYear();
  cls = currDate === day && currMonth + 1 === month && currYear === year ? `${cls} ${css['calendar__cell--active']}` : cls;
  const isDisabledCls = currMonth + 1 !== month ? css['calendar__cell--disabled'] : '';
  const handleClick = () => {
    if (!data) {
      return false;
    }
    modal?.current?.open();
    return true;
  };

  const handleDoubleClick = () => {
    const meetingData = meeting[date];
    if (!meetingData || isDisabledCls) {
      return false;
    }
    navigate(`/meeting/${meetingData.id}`);
    return true;
  };

  const renderModal = data
    ? (
      <Modal ref={modal}>
        <ul className={css.Information}>
          <li className={css.Information__container}>
            <div className={css.Information__label}>Name:</div>
            <div>{name}</div>
          </li>
          <li className={css.Information__container}>
            <div className={css.Information__label}>Description:</div>
            <div>{desc}</div>
          </li>
          <li className={css.Information__container}>
            <div className={css.Information__label}>From - To:</div>
            <div>{dates?.replace(',', ' - ')}</div>
          </li>
          <li className={css.Information__container}>
            <div className={css.Information__label}>Attendees:</div>
            <div>{attendees}</div>
          </li>
        </ul>
      </Modal>
    ) : null;

  return (
    <>
      <div
        role="presentation"
        key={date}
        className={`${css.calendar__cell} ${cls} ${isDisabledCls}`}
        onClick={(e) => {
          let isDoubleClick = false;
          if (e.detail === 2) {
            isDoubleClick = true;
            handleDoubleClick();
          }
          setTimeout(() => {
            if (e.detail === 1 && !isDoubleClick) {
              handleClick();
            }
          }, 300);
        }}
      >
        {DayStr}
        {day}
      </div>
      {renderModal}
    </>
  );
}
