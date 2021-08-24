import "firebase/database";
import { useDatabase, useDatabaseListData } from "reactfire";

const useListData = ({ refName, orderBy }) => {
  const database = useDatabase();
  const ref = database.ref(refName);
  const query = ref.orderByChild(orderBy || "id");
  const { status, data } = useDatabaseListData(query, {
    idField: "id",
  });
  const addData = (data) => {
    const newRef = ref.push();
    newRef.set(data);
  };
  const removeData = (id) => {
    const ref = database.ref(`${refName}/` + id);
    ref.remove();
  };
  return { data, addData, removeData, loading: status === "loading" };
};

export default useListData;
