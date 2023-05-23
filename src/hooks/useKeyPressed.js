import React from "react";

function useKeyPressed(keyCode, callback) {
    const handleKeyPress = React.useCallback(
        function handleKeyPress(event) {
            if (event.code === keyCode) {
                callback();
            }
        }, [keyCode, callback]);

    React.useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);

        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [handleKeyPress])
}

export default useKeyPressed;