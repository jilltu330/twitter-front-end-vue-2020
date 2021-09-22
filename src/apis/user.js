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
  addFollowed({ id }) {
    return apiHelper.post(
      '/followships',
      { id },
      {
        headers: { Authorization: `Bearer ${getToken()}` },
      }
    )
  },
  deleteFollowed({ id }) {
    return apiHelper.delete(`/followships/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
  },
  getCurrentUsers() {
    console.log(getToken())
    return apiHelper.get('/current_user', null, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
  },
}
