import { gql, useQuery } from '@apollo/client';

export interface UseOrganizationsVariables {
    pageSize: number;
    page: number;
    id?: string;
    name?: string;
    rollupId: string;
    dba?: string;
    sortBy?: string;
}

export interface UseGetOrganizationsQuery {
    variables: UseOrganizationsVariables;
}

/**
 * Paginate and allows for searching for an organization or multiple organizations
 * @public
 */
const useGetOrganizationsQuery = ({ variables }: UseGetOrganizationsQuery) => {
    const queryKey = gql`
	query GetOrganizations($page: Int!, $pageSize Int!, $id: String, $name: $String, rollupId: $String, $dba: String, $sortBy: String) {
	  organizations(page: $page, pageSize: $pageSize) {
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
        organizations: data || null,
        total: data.total ?? 0,
        page: data.page ?? 0,
        pageSize: data.pageSize ?? 0,
        isLoading: loading,
        error,
        stopPolling,
        startPolling,
    };
};

export default useGetOrganizationsQuery;
