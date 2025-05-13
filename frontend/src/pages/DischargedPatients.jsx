import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import {fetchDischargedPatients} from '../api/api.js'


const DischargedPatients = () => {

  const [page,setPage] = useState(1)

  const {data:patients,isLoading,error,success} = useQuery({
    queryKey: ['dischargedPatients', page],
    queryFn: () => fetchDischargedPatients(page),
    keepPreviousData: true,
  })

  const totalPages = patients?.data?.totalPages

  const handleNext = () => {
    if(patients?.data && page < patients?.data?.totalPages) setPage(p=>p+1)
  }

  const handlePrevious = () => {
    if(page>1) setPage(p => p-1)
  }

    if (isLoading) {
        return (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        );
      }
    
      return (
        <div className='select-none'>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}
          
          {success && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
              {success}
            </div>
          )}
          
          {patients?.data?.docs?.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <p className="text-gray-500">No patients found</p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Age
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Room
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Bed
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Days
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Assigned Doctor
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Admission Date
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Discharged Date
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white text-center divide-y divide-gray-200">
                    {patients?.data?.docs?.map((patient) => (
                      <tr key={patient._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{patient.age}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 ">{patient.roomNumber}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{patient.bedNumber}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{patient.totalDays}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{patient.doctorName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{new Date(patient.admissionDate).toLocaleDateString()}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{new Date(patient.dischargeDate).toLocaleDateString()}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {patient.dischargeDate ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Discharged
                            </span>
                          ) : (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                              Admitted
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <footer className='flex flex-row mt-4 justify-between'>
                  <div>
                    <button disabled={page === 1} className='bg-blue-600 text-white rounded-md px-3 py-2 ml-3 mr-3 mb-3 disabled:opacity-50' onClick={handlePrevious}>← Previous</button>
                  </div>
                  <div>
                  <span className="text-gray-400">Page {page} of {totalPages}</span>
                  </div>
                  <div>
                    <button disabled={page === totalPages} className='bg-blue-600 text-white rounded-md px-3 py-2 ml-3 mr-3 mb-3 disabled:opacity-50' onClick={handleNext}>Next →</button>
                  </div>
                </footer>

              </div>
            </div>
          )}
        </div>
      );
}

export default DischargedPatients