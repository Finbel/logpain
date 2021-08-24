import useListData from "./useListData";

const useMedications = () => {
  const {
    loading,
    data: medications,
    addData,
    removeData: removeMedication,
  } = useListData({ refName: "medications", orderBy: "time" });
  const addMedication = (time) => {
    addData({ time: new Date(time.time).getTime() });
  };
  return { medications, addMedication, removeMedication, loading };
};

export default useMedications;
