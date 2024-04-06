import { useLocation } from "react-router-dom";
import { getTransaction } from "../api";
import { useEffect, useState } from "react";

export default function Modify() {
  const location = useLocation();
  const { id } = location.state;
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await getTransaction(id);
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  console.log(data);

  return <div>수정페이지입니다.</div>;
}
