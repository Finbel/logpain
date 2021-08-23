import "firebase/database";
import { useDatabase, useDatabaseListData } from "reactfire";

const useLogs = () => {
  const database = useDatabase();
  const logsRef = database.ref("logs");
  const logsQuery = logsRef.orderByChild("time");
  const { status, data: logs } = useDatabaseListData(logsQuery, {
    idField: "id",
  });
  const addLog = (log) => {
    const newRef = logsRef.push();
    const time = new Date(log.time).getTime();
    newRef.set({ ...log, time });
  };
  const removeLog = (id) => {
    const logRef = database.ref("logs/" + id);
    logRef.remove();
  };
  return { logs, addLog, removeLog, loading: status === "loading" };
};

export default useLogs;
