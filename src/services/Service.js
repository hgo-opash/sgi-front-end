import axios from 'axios';
import { useDispatch } from 'react-redux';
import ErrorToast from '../toast/Error';
import SuccessToast from '../toast/Success';
import { setLogindata } from '../slices/loginSlice';
import { deleteSubscription, setSubscriptions } from '../slices/subscriptionSlice';
import { setCompanies } from '../slices/companiesSlice';

export const LoginResponse = (values) => axios.post(`${process.env.REACT_APP_API_URL}/login`, values);

export const RegisterResponse = (values) => axios.post(`${process.env.REACT_APP_API_URL}/register`, values);

export const SaveCompanyResponse = (values) =>
  axios.post(`${process.env.REACT_APP_API_URL}/savecompany`, values, {
    headers: {
      authorization: `Bearer ${localStorage.getItem('Jtoken')}`,
    },
  });

export const GetcompaniesResponse = () =>
  axios.get(`${process.env.REACT_APP_API_URL}/getcompanies`, {
    headers: {
      authorization: `Bearer ${localStorage.getItem('Jtoken')}`,
    },
  });

export const GetsubsResponse = () =>
  axios.get(`${process.env.REACT_APP_API_URL}/getsubs`, {
    headers: {
      authorization: `Bearer ${localStorage.getItem('Jtoken')}`,
    },
  });

export const SavesubsResponse = (values) =>
  axios.post(`${process.env.REACT_APP_API_URL}/savesubs`, values, {
    headers: {
      authorization: `Bearer ${localStorage.getItem('Jtoken')}`,
    },
  });

export const DeletesubResponse = (val) =>
  axios.post(
    `${process.env.REACT_APP_API_URL}/deletsub`,
    { id: val.row._id },
    {
      headers: {
        authorization: `Bearer ${localStorage.getItem('Jtoken')}`,
      },
    }
  );

export const DeletAllResponse = () =>
  axios.post(`${process.env.REACT_APP_API_URL}/deletAll`, null, {
    headers: {
      authorization: `Bearer ${localStorage.getItem('Jtoken')}`,
    },
  });

export const ProfilepicResponse = (e) =>
  axios.post(
    `${process.env.REACT_APP_API_URL}/profilepic`,
    { profilepic: e.target.files[0] },
    {
      headers: {
        authorization: `Bearer ${localStorage.getItem('Jtoken')}`,
        'Content-Type': 'multipart/form-data',
      },
    }
  );

export const FbloginResponse = (res) => axios.post(`${process.env.REACT_APP_API_URL}/fblogin`, res);

export const ForgotpassResponse = (values) => axios.post(`${process.env.REACT_APP_API_URL}/forgotpass`, values);

export const VerifyLoginToken = (values, props) =>
  axios.post(`${process.env.REACT_APP_API_URL}/verify/${props.token}`, values);
