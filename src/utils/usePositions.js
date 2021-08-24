import useListData from "./useListData";

const useLogs = () => {
  const {
    loading,
    data: positions,
    addData: addPosition,
    removeData: removePosition,
  } = useListData({ refName: "positions", orderBy: "position" });

  return { positions, addPosition, removePosition, loading };
};

export default useLogs;
