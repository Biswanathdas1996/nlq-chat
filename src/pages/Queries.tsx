import React from "react";
import Table from "../components/Table";

const Queries: React.FC = () => {
  const [message, setMessage] = React.useState<any>(null);
  const [id, setId] = React.useState<string>("");

  React.useEffect(() => {
    const requestOptions: RequestInit = {
      method: "GET",
      redirect: "follow" as RequestRedirect,
    };

    fetch("http://127.0.0.1:5000/query-list", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setMessage(result);
        setId(result.id || "");
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <div>
      <h2>Saved Queries</h2>

      <Table
        data={Array.isArray(message) ? message : []}
        loadingUi={false}
        chatId={id as unknown as number}
      />
    </div>
  );
};

export default Queries;
