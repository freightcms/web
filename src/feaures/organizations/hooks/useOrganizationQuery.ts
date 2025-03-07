import { gql, useQuery } from "@apollo/client";

export interface UseOrganizationQuery {
  variables: {
    id: string;
  };
}
export const useOrganizationQuery = ({ variables }: UseOrganizationQuery) => {
  const queryKey = gql`
	query Organization($id: String!) {
	  organization(id $id) {
	    id,
	    name,
	    rollupId,
	    dba
	  }
	}
    `;
  const { data, loading, error, stopPolling, startPolling } = useQuery(
    queryKey,
    {
      variables,
    },
  );

  return {
    organization: data || null,
    isLoading: loading,
    error,
    stopPolling,
    startPolling,
  };
};
