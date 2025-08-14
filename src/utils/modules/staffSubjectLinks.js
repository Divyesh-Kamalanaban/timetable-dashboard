// Utility functions for managing staff-subject links for classes
import axios from 'axios';

export async function linkStaffToSubject(year, className, subject, staffId) {
  return axios.post(`/api/${year}/link-staff-subject`, { className, subject, staffId });
}

export async function getStaffSubjectLinks(year, className) {
  return axios.get(`/api/${year}/staff-subject-links/${className}`);
}

export async function unlinkStaffFromSubject(year, className, subject, staffId) {
  return axios.delete(`/api/${year}/unlink-staff-subject`, { data: { className, subject, staffId } });
}
