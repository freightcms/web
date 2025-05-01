import { gql, NetworkStatus, useQuery } from "@apollo/client";

const GET_CARRIERS = gql`
  query {
    carriers {
      id
    }
  }
`;

const Table = () => {
  const {data, loading, networkStatus} = useQuery(GET_CARRIERS, {})

  if (loading) {
    return (<div><p>Loading...</p></div>);
  }

  console.log(data);

  return (<table>
    <thead>
      <tr>
        <th>ID</th>
      </tr>
    </thead>
    <tbody>
    </tbody>
  </table>);
};

export {Table as CarrierTable}

