import React from 'react';

import Button from '../Button';

import styles from './ToastPlayground.module.css';
import ToastShelf from "../ToastShelf";
import {ToastContext} from "../ToastProvider";

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

function ToastPlayground() {
  const { createToast } = React.useContext(ToastContext);

  const [message, setMessage] = React.useState('');
  const [selectedVariant, setSelectedVariant] = React.useState(VARIANT_OPTIONS[0]);


  function handleSubmit(event) {
    event.preventDefault();
    console.log({
        message,
        selectedVariant
    })

    createToast(message, selectedVariant);

    setMessage('');
    setSelectedVariant(VARIANT_OPTIONS[0]);
  }

  return (
    <div className={styles.wrapper}>
      <ToastHeader />
      <ToastShelf />
      <ToastForm
        message={message}
        setMessage={setMessage}
        selectedVariant={selectedVariant}
        setSelectedVariant={setSelectedVariant}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

function ToastHeader() {
    return (
        <header>
            <img alt="Cute toast mascot" src="/toast.png" />
            <h1>Toast Playground</h1>
        </header>
    );
}

function ToastForm({ message, setMessage, selectedVariant, setSelectedVariant, onSubmit }) {
    function handleVariantChange(event) {
        setSelectedVariant(event.target.value);
    }

    function handleMessageChange(event) {
        setMessage(event.target.value);
    }

    return (
        <form
            onSubmit={onSubmit}
            className={styles.controlsWrapper}
        >
            <div className={styles.row}>
                <label
                    htmlFor="message"
                    className={styles.label}
                    style={{ alignSelf: 'baseline' }}
                >
                    Message
                </label>
                <div className={styles.inputWrapper}>
                    <textarea
                        id="message" className={styles.messageInput}
                        value={message}
                        onChange={handleMessageChange}
                    />
                </div>
            </div>

            <div className={styles.row}>
                <div className={styles.label}>Variant</div>
                <div
                    className={`${styles.inputWrapper} ${styles.radioWrapper}`}
                >
                    { VARIANT_OPTIONS.map((variant, i) => {
                        return (
                            <label key={i} htmlFor={`variant-${variant}`}>
                                <input
                                    id={`variant-${variant}`}
                                    type="radio"
                                    name="variant"
                                    value={variant}
                                    checked={selectedVariant === variant}
                                    onChange={handleVariantChange}
                                />
                                {variant}
                            </label>
                        );
                    }) }
                </div>
            </div>

            <div className={styles.row}>
                <div className={styles.label} />
                <div
                    className={`${styles.inputWrapper} ${styles.radioWrapper}`}
                >
                    <Button>Pop Toast!</Button>
                </div>
            </div>
        </form>
    );
}

export default ToastPlayground;
