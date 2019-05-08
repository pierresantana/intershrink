import React from 'react';
import './Toasts.css';
import { Toast, ToastHeader } from 'reactstrap';
import { removeToasts } from '../../actions';
import connect from '../../connect';

function Toasts({ toasts, removeToasts }) {

  return (
    <div className="toasts">
      {toasts.list.map((toast, index) => (
        <Toast key={index}>
          <ToastHeader toggle={() => removeToasts(toast)}>
            {toast.message}
          </ToastHeader>
        </Toast>
      ))}
    </div>
  );
}

const mapStateToProps = store => ({
  toasts: store.toasts
});

const mapDispathToProps = dispatch => ({
  removeToasts: param => dispatch(removeToasts(param))
});

export default connect(
  mapStateToProps,
  mapDispathToProps
)(Toasts);
