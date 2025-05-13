import axios from "axios";

const API = axios.create({baseURL:'http://localhost:5000/api'})

export const fetchAllBeds = () => API.get('/beds/available')
export const fetchAllPatients = () => API.get('/patients/all')
export const fetchAdmittedPatients = () => API.get('/patients/admitted')
export const fetchDischargedPatients = (page = 1) => API.get(`/patients/discharged/?page=${page}`)
export const AdmitPatientAPI = async (formData) => await API.post('/patients/admit',formData)
export const DischargePatient = (id) => API.put(`/patients/${id}/discharge`)
export const AddDoctor = (formData) => API.post('/doctor/add',formData)
export const GetAllDoctors = () => API.get('/doctor/get-doctors')
export const DoctorPicUPdate = ({id,profileImage}) => API.post(`/doctor/${id}/update-p-pic`,profileImage)