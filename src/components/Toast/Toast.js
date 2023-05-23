import React from 'react';
import {
  AlertOctagon,
  AlertTriangle,
  CheckCircle,
  Info,
  X,
} from 'react-feather';

import VisuallyHidden from '../VisuallyHidden';

import styles from './Toast.module.css';
import {ToastContext} from "../ToastProvider";

const ICONS_BY_VARIANT = {
  notice: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  error: AlertOctagon,
};

function Toast({ id, variant, children }) {
  const { dismissToast } = React.useContext(ToastContext);

  if (!Object.keys(ICONS_BY_VARIANT).includes(variant)) {
      throw new Error(`Provided variant ${variant} is not valid. Must be one of ${Object.keys(ICONS_BY_VARIANT)}.`);
  }

  const IconTag = ICONS_BY_VARIANT[variant];

  return (
    <div className={`${styles.toast} ${styles[variant]}`}>
      <div className={styles.iconContainer}>
          <IconTag size={24} />
      </div>
      <p className={styles.content}>
          <VisuallyHidden>{variant} -</VisuallyHidden>
          { children }
      </p>
      <button
          className={styles.closeButton}
          onClick={() => dismissToast(id)}
          aria-label="Dismiss message"
          aria-live="off"
      >
        <X size={24} />
      </button>
    </div>
  );
}

export default Toast;
