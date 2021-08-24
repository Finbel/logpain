import useListData from "./useListData";

const useLogs = () => {
  const {
    loading,
    data: logs,
    addData,
    removeData: removeLog,
  } = useListData({ refName: "logs", orderBy: "time" });
  const addLog = (log) => {
    const time = new Date(log.time).getTime();
    addData({ ...log, time });
  };
  return { logs, addLog, removeLog, loading };
};

export default useLogs;
