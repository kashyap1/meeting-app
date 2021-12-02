import React, {
  useEffect, useImperativeHandle, useState, forwardRef, useCallback
} from 'react';
import { createPortal } from 'react-dom';
import css from './index.module.css';

const modalElement = document.getElementById('modal-root');

export function Modal({ children, fade = false, defaultOpened = false }, ref) {
  const [isOpen, setIsOpen] = useState(defaultOpened);

  const close = useCallback(() => setIsOpen(false), []);

  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
    close
  }), [close]);

  const handleEscape = useCallback((event) => {
    if (event.keyCode === 27) close();
  }, [close]);

  useEffect(() => {
    if (isOpen) document.addEventListener('keydown', handleEscape, false);
    return () => {
      document.removeEventListener('keydown', handleEscape, false);
    };
  }, [handleEscape, isOpen]);

  return createPortal(
    isOpen ? (
      <div className={`${css.modal} ${fade ? css.modal__fade : ''}`}>
        <div className={css.modal__overlay} onClick={close} role="presentation" />
        <span role="button" className={css.modal__close} aria-label="close" onClick={close} tabIndex={0}>
          x
        </span>
        <div className={css.modal__body}>{children}</div>
      </div>
    ) : null,
    modalElement
  );
}

export default forwardRef(Modal);
