import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function List() {
  const [sakeList, setSakeList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("sake_list")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        console.error(error);
      } else {
        setSakeList(data);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>日本酒一覧</h2>

      {sakeList.map((item) => (
        <div
          key={item.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "8px",
          }}
        >
          <h3>{item.name}</h3>
          <p>度数: {item.abv}</p>
          <p>味: {item.taste}</p>
          <p>コメント: {item.comment}</p>
        </div>
      ))}
    </div>
  );
}
