import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function Edit() {
  const [name, setName] = useState("");
  const [abv, setAbv] = useState("");
  const [taste, setTaste] = useState("");
  const [comment, setComment] = useState("");

  const handleAdd = async () => {
    const { error } = await supabase.from("sake_list").insert([
      { name, abv, taste, comment },
    ]);
    if (error) {
      alert("追加エラー: " + error.message);
    } else {
      alert("追加完了！");
      setName("");
      setAbv("");
      setTaste("");
      setComment("");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>日本酒追加ページ</h2>

      <input
        placeholder="名前"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="度数"
        value={abv}
        onChange={(e) => setAbv(e.target.value)}
      />
      <input
        placeholder="味"
        value={taste}
        onChange={(e) => setTaste(e.target.value)}
      />
      <input
        placeholder="コメント"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <button onClick={handleAdd}>追加</button>
    </div>
  );
}
