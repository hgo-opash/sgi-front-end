import Swal from 'sweetalert2';

const SuccessToast = (message) => {
  Swal.fire({
    icon: 'success',
    position: 'bottom-end',
    title: message,
    timer: 3000,
    toast: true,
    backdrop: false,
    showConfirmButton: false,
  });
};

export default SuccessToast;
