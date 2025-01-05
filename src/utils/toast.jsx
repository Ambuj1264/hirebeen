import toast from 'react-hot-toast';


export const successToast = (message) => {
  toast.success(message, {
    position: 'top-center',
    style: {
      border: '1px solid #4CAF50',
      padding: '16px',
      color: '#4CAF50',
    },
    iconTheme: {
      primary: '#4CAF50',
      secondary: '#FFFFFF',
    },
  });
};


export const failureToast = (message) => {
  toast.error(message, {
    position: 'top-center',
    style: {
      border: '1px solid #F44336',
      padding: '16px',
      color: '#F44336',
    },
    iconTheme: {
      primary: '#F44336',
      secondary: '#FFFFFF',
    },
  });
};