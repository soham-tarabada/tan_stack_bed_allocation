import { useEffect, useRef } from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-responsive';
import '../index.css'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {DischargePatient, fetchAdmittedPatients} from '../api/api.js'


const PatientList = () => {

  const queryClient = useQueryClient()
  const tableRef = useRef(null)

  const {data:patients,isLoading:admittedPatientsLoading,error:admittedPatientsError,success,refetch} = useQuery({
      queryKey:['admitted-patients'],
      queryFn:fetchAdmittedPatients
  })

  const mutation = useMutation({
    mutationFn:DischargePatient,
    onSuccess:() => {
      queryClient.invalidateQueries(['admitted-patients'])
    }
  })

  useEffect(() => {
    if (patients?.data?.length > 0) {
      $(tableRef.current).DataTable();
    }
  }, [patients]);


  if (admittedPatientsLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="select-none">
      {admittedPatientsError && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {admittedPatientsError}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
          {success}
        </div>
      )}

      {patients?.data?.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-500">No patients found</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table ref={tableRef} className="!min-w-full !pl-4 !divide-y !divide-gray-200 !display !responsive !nowrap">
              <thead className="!bg-gray-5">
                <tr className='!text-gray-500 h-16'>
                  <th className='!text-center bg-blue-600 text-white'>Name</th>
                  <th className='!text-center bg-blue-600 text-white'>Age</th>
                  <th className='!text-center bg-blue-600 text-white'>Room</th>
                  <th className='!text-center bg-blue-600 text-white'>Bed</th>
                  <th className='!text-center bg-blue-600 text-white'>Days</th>
                  <th className='!text-center bg-blue-600 text-white'>Assigned Doctor</th>
                  <th className='!text-center bg-blue-600 text-white'>Admission Date</th>
                  <th className='!text-center bg-blue-600 text-white'>Status</th>
                  <th className='!text-center bg-blue-600 text-white'>Actions</th>
                </tr>
              </thead>
              <tbody className="!bg-white !text-center !divide-y !divide-gray-200">
                {patients?.data?.map((patient) => (
                  <tr className='h-14' key={patient._id}>
                    <td className='!text-black !font-semibold !text-center'>{patient.name}</td>
                    <td className='!text-gray-500 !text-center !px-3 !py-2'>{patient.age}</td>
                    <td className='!text-gray-500 !text-center !px-3 !py-2'>{patient.roomNumber}</td>
                    <td className='!text-gray-500 !text-center !px-3 !py-2'>{patient.bedNumber}</td>
                    <td className='!text-gray-500 !text-center !px-3 !py-2'>{patient.totalDays}</td>
                    <td className='!text-gray-500 !text-center !px-3 !py-2'>{patient.doctorName}</td>
                    <td className='!text-gray-500 !text-center !px-3 !py-2'>{new Date(patient.admissionDate).toLocaleDateString()}</td>
                    <td className='!text-gray-500 !text-center !px-3 !py-2'>
                      {patient.dischargeDate ? (
                        <span className="!px-2 !inline-flex !text-xs !leading-5 !font-semibold !rounded-full !bg-green-200 !text-green-800">
                          Discharged
                        </span>
                      ) : (
                        <span className="!px-2 !inline-flex !text-xs !leading-5 !font-semibold !rounded-full !bg-blue-100 !text-blue-800">
                          Admitted
                        </span>
                      )}
                    </td>
                    <td className='!text-center !px-3 !py-2'>
                      {!patient.dischargeDate && (
                        <button
                          onClick={() => {
                            mutation.mutate(patient._id)
                          }}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Discharge
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientList;