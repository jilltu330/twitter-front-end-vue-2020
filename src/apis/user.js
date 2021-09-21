import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  getTopUsers() {
    return apiHelper.get('/users/top_users', {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
  },
  // TODO: 待修復 setting api
  // getUserDetail() {
  //   return apiHelper.get(`/users/${user_id}`, {
  //     headers: { Authorization: `Bearer ${getToken()}` },
  //   })
  // },
  // updateUserSetting({ user_id, formData }) {
  //   return apiHelper.put(`/users/${user_id}/setting`, formData, {
  //     headers: { Authorization: `Bearer ${getToken()}` },
  //   })
  // },
  // addFollowed({ userId }) {
  //   return apiHelper.post(`/following/${userId}`, null, {
  //     headers: { Authorization: `Bearer ${getToken()}` },
  //   })
  // },
  // deleteFollowed({ userId }) {
  //   return apiHelper.post(`/following/${userId}`, null, {
  //     headers: { Authorization: `Bearer ${getToken()}` },
  //   })
  // },
}