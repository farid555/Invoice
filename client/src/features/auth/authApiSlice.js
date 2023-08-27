import { baseApiSlice } from '../api/baseApiSlice';
import { logOut } from './authSlice';

export const authApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
    }),

    loginUser: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),

    logoutUser: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'GET',
      }),
    }),
    async oneQueryStarted(args, { dispatch, queryFulfilled }) {
      try {
        dispatch(logOut());
        dispatch(baseApiSlice.util.resetApiState());
      } catch (error) {
        console.log(error);
      }
    },
    resendVerifyEmail: builder.mutation({
      query: (userEmail) => ({
        url: '/auth/resend_email_token',
        method: "POST",
        body: userEmail,
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useResendVerifyEmailMutation,
} = authApiSlice;
