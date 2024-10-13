import { Snackbar, Alert as MuiAlert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { closeAlert } from '../../redux/slices/alertSlice';

/**
 * Custom Alert component that shows a message and automatically hides after a set duration.
 *
 * This component displays an alert message using MUI's Snackbar and Alert components.
 * It automatically hides after a given `duration` (default is 3000ms) and can be customized for different alert types.
 *
 * @component
 */
const Alert = () => {
  const dispatch = useDispatch();
  const { open, message, severity, duration } = useSelector((state) => state.alert);

  const handleClose = () => {
    dispatch(closeAlert());
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <MuiAlert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default Alert;






