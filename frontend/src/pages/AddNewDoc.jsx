import { useEffect, useState } from "react";
import DocRaw from "../DocRaw.png";
import { SquarePen } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AddDoctor, DoctorPicUPdate, GetAllDoctors } from "../api/api.js";

const AddNewDoc = () => {
  const queryClient = useQueryClient();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [degree, setDegree] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const [isScreenOpen, setIsScreenOpen] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState();
  const [newProfileImage, setNewProfileImage] = useState("");

  const {
    data: doctors,
    success,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["get-all-docs"],
    queryFn: GetAllDoctors,
  });

  const mutation = useMutation({
    mutationFn: AddDoctor,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-all-docs"],
      });
      setName("");
      setAge("");
      setDegree("");
      setProfileImage("");
    },
  });

  const handleAddNewDoc = async (e) => {
    e.preventDefault();
    if (!name || !age || degree === "Select Degree" || !profileImage) {
      console.log("Please provide valid information!");
      return;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("age", age);
    formData.append("degree", degree);
    formData.append("profileImage", profileImage);

    mutation.mutate(formData);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
    }
  };

  const handleNewFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProfileImage(file);
    }
  };

  const updateImageMutation = useMutation({
    mutationFn: DoctorPicUPdate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-all-docs"] });
      setIsScreenOpen(false);
      setNewProfileImage(null);
    },
    onError: (error) => {
      console.error("Failed to update image !", error.message);
    },
  });

  const handleUpdateProfile = async () => {
    if (!newProfileImage || !selectedDoctorId) return;
    const formData = new FormData();
    formData.append("profileImage", newProfileImage);
    updateImageMutation.mutate({
      id: selectedDoctorId,
      profileImage: formData,
    });
    setIsScreenOpen(false);
    setSelectedDoctorId();
  };

  const handleDoctor = (id) => {
    if (!id) return;
    setSelectedDoctorId(id);
    setIsScreenOpen(true);
  };
  
  useEffect(() => {
    if (updateImageMutation.isSuccess) {
      setIsScreenOpen(false);
      setSelectedDoctorId(null);
      setNewProfileImage(null);
    }
  }, [updateImageMutation.isSuccess]);

  return (
    <div className="flex select-none">
      {/* FORM */}
      <div className="w-1/2 flex-col h-screen justify-center pt-28 mr-2">
        <div className="items-center mb-10 -mt-10">
          <img src={DocRaw} className="w-[150px] h-[170px] ml-72" />
        </div>
        <form onSubmit={handleAddNewDoc}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Doctor Image
              </label>
              {profileImage && (
                <img
                  src={URL.createObjectURL(profileImage)}
                  className="rounded-md h-24 w-32"
                />
              )}
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Doctor Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter doctor name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Doctor Age
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter doctor age"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Doctor Degree
              </label>
              <input
                type="text"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter doctor degree"
              />
            </div>
          </div>
          <div className="mt-6">
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
              Add New Doctor
            </button>
          </div>
        </form>
      </div>

      <div className="w-px min-h-full rounded-md border-[1px] border-black mr-5 ml-5"></div>

      {/* LIST OF DOCS */}
      <div className="w-1/2 ml-2 h-screen">
        <h1 className="text-3xl font-semibold bg-blue-600 px-3 py-2 w-fit rounded-lg text-white mb-5">
          DOCTOR's LIST
        </h1>
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
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          doctors?.data?.map((doctor, index) => (
            <div
              key={Math.random() + "xys" + index}
              className="flex items-center mb-3"
            >
              <img
                src={doctor?.profileImage}
                className="w-12 h-12 rounded-3xl border-black border-2"
              />
              <SquarePen
                onClick={() => {
                  handleDoctor(doctor?._id);
                }}
                className="ml-2 hover:cursor-pointer w-5 h-5"
              />
              <p className="ml-3">
                Dr. {doctor?.name} ({doctor?.degree})
              </p>
            </div>
          ))
        )}
      </div>

      {/* IMAGE UPDATE MODAL */}
      {isScreenOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            {isLoading ? (
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                <p className="mt-2 text-gray-700">Updating Image...</p>
              </div>
            ) : success ? (
              <div className="text-green-600 font-semibold">
                Doctor Image Updated Successfully!
              </div>
            ) : (
              <>
                <h2 className="text-lg font-semibold mb-4">
                  Update Profile Picture
                </h2>
                <div className="flex flex-col gap-2 mb-4">
                  <input type="file" onChange={handleNewFileChange} />
                  {newProfileImage && (
                    <img
                      src={URL.createObjectURL(newProfileImage)}
                      className="rounded-md h-24 w-32"
                    />
                  )}
                </div>
                <div className="flex justify-end mt-4">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    onClick={handleUpdateProfile}
                  >
                    Update
                  </button>
                  <button
                    className="ml-2 bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
                    onClick={() => setIsScreenOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {updateImageMutation.isPending && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
            <p className="mt-4 text-lg font-medium text-gray-700">
              Updating image...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddNewDoc;