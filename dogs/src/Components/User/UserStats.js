import React from "react";
import { GET_STATS } from "../../Api";
import useFetch from "../../Hooks/useFetch";
import Error from "../Helper/Error";
import Head from "../Helper/Head";
import Loading from "../Helper/Loading";
const UserStatsGraphs = React.lazy(() => import("./UserStatsGraphs"));

function UserStats() {
  const { data, error, loading, request } = useFetch();
  
  React.useEffect(() => {
    const token = window.localStorage.getItem("token");
    const getData = async () => {
      const { url, options } = GET_STATS(token);
      await request(url, options);
    };
    getData();
  }, [request]);

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;
  if (data)
    return (
      <React.Suspense fallback={<div></div>}>
        <Head title="Estatísticas" />;
        <UserStatsGraphs data={data} />
      </React.Suspense>
    );
  else return null;
}

export default UserStats;
