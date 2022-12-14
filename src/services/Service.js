import axios from 'axios';

export const LoginResponse = (values) => axios.post(`${process.env.REACT_APP_API_URL}/login`, values);

export const RegisterResponse = (values) => axios.post(`${process.env.REACT_APP_API_URL}/register`, values);

export const GetUserResponse = () =>
  axios.get(`${process.env.REACT_APP_API_URL}/getuser`, {
    headers: {
      authorization: `Bearer ${localStorage.getItem('Jtoken')}`,
    },
  });

export const SaveCompanyResponse = (values, image) => {
  console.log('service img  => ', image);
  return axios.post(
    `${process.env.REACT_APP_API_URL}/savecompany`,
    { values, logo: image },
    {
      headers: {
        authorization: `Bearer ${localStorage.getItem('Jtoken')}`,
        'Content-Type': 'multipart/form-data',
      },
    }
  );
};

export const GetcountiesResponse = () => axios.get(`${process.env.REACT_APP_API_URL}/countries`);

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

  export const AttachmentResponse = (e) =>
  axios.post(
    `${process.env.REACT_APP_API_URL}/attachment`,
    { attachment: e.target.files[0] },
    {
      headers: {
        authorization: `Bearer ${localStorage.getItem('Jtoken')}`,
        'Content-Type': 'multipart/form-data',
      },
    }
  );

export const SavesubsResponse = (values) =>
  axios.post(`${process.env.REACT_APP_API_URL}/savesubs`, values, {
    headers: {
      authorization: `Bearer ${localStorage.getItem('Jtoken')}`,
      'Content-Type': 'multipart/form-data',
    },
  });

export const SavesubsBulkResponse = (values) =>
  axios.post(
    `${process.env.REACT_APP_API_URL}/savebulk`,
    { values },
    {
      headers: {
        authorization: `Bearer ${localStorage.getItem('Jtoken')}`,
      },
    }
  );

export const EditsubsResponse = (id, {attachment, ...values}) =>
  axios.post(
    `${process.env.REACT_APP_API_URL}/editsub`,
    { id, attachment, ...values },
    {
      headers: {
        authorization: `Bearer ${localStorage.getItem('Jtoken')}`,
         'Content-Type': 'multipart/form-data',
      },
    }
  );

export const ChangeStatusResponse = (id, status) =>
  axios.post(
    `${process.env.REACT_APP_API_URL}/changestatus`,
    { id, values : {status} },
    {
      headers: {
        authorization: `Bearer ${localStorage.getItem('Jtoken')}`,
      },
    }
  );

export const ChangeRatingResponse = (id, rating) =>
  axios.post(
    `${process.env.REACT_APP_API_URL}/changerating`,
    { id, values : {rating} },
    {
      headers: {
        authorization: `Bearer ${localStorage.getItem('Jtoken')}`,
      },
    }
  );

export const ChangeLikeResponse = (id, isLiked) =>
  axios.post(
    `${process.env.REACT_APP_API_URL}/changelike`,
    { id, values : {isLiked} },
    {
      headers: {
        authorization: `Bearer ${localStorage.getItem('Jtoken')}`,
      },
    }
  );

export const EditComapnysubsResponse = (id, values) =>
  axios.post(
    `${process.env.REACT_APP_API_URL}/editcompany`,
    { id, values },
    {
      headers: {
        authorization: `Bearer ${localStorage.getItem('Jtoken')}`,
      },
    }
  );

export const DeletesubResponse = (id) =>
  axios.post(
    `${process.env.REACT_APP_API_URL}/deletsub`,
    { id },
    {
      headers: {
        authorization: `Bearer ${localStorage.getItem('Jtoken')}`,
      },
    }
  );

export const DeleteCompanyResponse = (id) =>
  axios.post(
    `${process.env.REACT_APP_API_URL}/deletecompany`,
    { id },
    {
      headers: {
        authorization: `Bearer ${localStorage.getItem('Jtoken')}`,
      },
    }
  );

export const DeletAllResponse = (selectedIDs) =>
  axios.post(
    `${process.env.REACT_APP_API_URL}/deletsub`,
    { id: selectedIDs },
    {
      headers: {
        authorization: `Bearer ${localStorage.getItem('Jtoken')}`,
      },
    }
  );
export const DeletAllCompanyResponse = (selectedIDs) =>
  axios.post(
    `${process.env.REACT_APP_API_URL}/deletecompany`,
    { id: selectedIDs },
    {
      headers: {
        authorization: `Bearer ${localStorage.getItem('Jtoken')}`,
      },
    }
  );

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
