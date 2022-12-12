import Swal from 'sweetalert2';

const ErrorToast = (message) => {
    Swal.fire({
        icon: 'error',
        position: 'bottom-end',
        title: message,
        timer: 3000,
        toast: true,
        backdrop: false,
        showConfirmButton: false,
      });
}

export default ErrorToast;
