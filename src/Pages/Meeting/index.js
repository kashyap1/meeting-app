import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import css from './index.module.css';
import { validateMeeting } from '../validator';
import CONSTANTS from '../../constants';

export default function Meeting() {
  const { id: meetingId } = useParams();
  const navigate = useNavigate();
  const { id } = useSelector(({ user }) => user);

  const initialStateData = {
    name: '',
    desc: '',
    from: '',
    to: '',
    attendees: ''
  };
  const [formFields, setFormFields] = useState(initialStateData);
  const [errors, setErrors] = useState({});

  const onChange = (e) => {
    const fields = { ...formFields, [e.target.name]: e.target.value };
    setFormFields(fields);
    return false;
  };

  useEffect(() => {
    if (!meetingId) {
      setFormFields(initialStateData);
      return;
    }
    fetch(`${CONSTANTS.BASE_URL}meetings/${meetingId}`)
      .then((res) => res.json())
      .then((data) => {
        const [from, to] = data.dates?.split(',') || {};
        setFormFields({ ...data, from, to });
      });
  }, [meetingId]);

  const onSubmit = (e) => {
    e.preventDefault();
    const err = validateMeeting(formFields);
    setErrors(err);
    if (Object.keys(err).length) {
      return null;
    }

    return fetch(`${CONSTANTS.BASE_URL}meetings${meetingId ? `/${meetingId}` : ''}`, {
      method: (meetingId ? 'PUT' : 'POST'),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...formFields, userId: id, dates: `${formFields.from},${formFields.to}`
      })
    }).then((res) => res.json())
      .then((resp) => {
        if (resp.id) {
          navigate('/');
        }
      });
  };

  return (
    <div className={css.meeting}>
      <form className={css.form}>
        <h2>Schedule Meeting</h2>
        <div className={css.row}>
          <input
            className={css.input}
            type="text"
            name="name"
            value={formFields.name}
            placeholder="Name"
            onChange={onChange}
          />
          <div className={css.error}>{errors?.name}</div>
        </div>
        <div className={css.row}>
          <input
            className={css.input}
            type="text"
            name="desc"
            value={formFields.desc}
            placeholder="Description"
            onChange={onChange}
          />
          <div className={css.error}>{errors?.desc}</div>
        </div>
        <div className={css.row}>
          <div className={css.row__subFields}>
            <input
              className={css.input}
              type="text"
              name="from"
              value={formFields.from}
              placeholder="From (DD-MM-YYYY)"
              onChange={onChange}
            />
            <input
              className={css.input}
              type="text"
              name="to"
              value={formFields.to}
              placeholder="To (DD-MM-YYYY)"
              onChange={onChange}
            />
          </div>
          <div className={css.error}>{errors?.dates}</div>
        </div>
        <div className={css.row}>
          <input
            className={css.input}
            type="text"
            name="attendees"
            value={formFields.attendees}
            placeholder="Attendees (e.g. test@email.com, test1@email.com)"
            onChange={onChange}
          />
          <div className={css.error}>{errors?.attendees}</div>
        </div>
        <div className={css.row}>
          <input
            type="submit"
            value="Schedule"
            className={css.button__primary}
            onClick={onSubmit}
          />
        </div>
      </form>
    </div>
  );
}
