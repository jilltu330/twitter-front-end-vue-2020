import { apiHelper } from './../utils/helpers'
import axios from 'axios'
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
  addFollowed({ id }) {
    return axios.post(
      'https://good-simple-twitter.herokuapp.com/followships',
      JSON.stringify({ id }),
      { headers: { Authorization: `Bearer ${getToken()}` } }
    )
  },
  deleteFollowed({ id }) {
    return apiHelper.delete(`/followships/${id}`, null, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
  },
}
