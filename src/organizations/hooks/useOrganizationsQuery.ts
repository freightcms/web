import { OrganizationModel } from '../types';
import { gql, useLoadableQuery } from '@apollo/client';

export interface UseOrganizationsVariables {
    pageSize: number;
    page: number;
    id?: string;
    name?: string;
    rollupId?: string;
    dba?: string;
    sortBy?: string;
}

export interface UseGetOrganizationsQuery {
    variables: UseOrganizationsVariables;
}

export interface OrganizationSearchModel {
    results: Array<OrganizationModel>;
    count: number;
    pageSize: number;
    page: number;
}

/**
 * Paginate and allows for searching for an organization or multiple organizations
 * @public
 */
const useGetOrganizationsQuery = () => {
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
    const [getOrganizations, organizationsQueryRef] = useLoadableQuery<
        OrganizationSearchModel,
        UseOrganizationsVariables
    >(queryKey);

    return {
        getOrganizations,
        organizationsQueryRef,
    };
};

export default useGetOrganizationsQuery;
