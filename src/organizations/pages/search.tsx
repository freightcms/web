import { FormEvent, useState } from 'react';
import { QueryRef, useReadQuery } from '@apollo/client';
import {
    useOrganizationsQuery,
    UseOrganizationsVariables,
} from 'organizations/hooks';
import { OrganizationModel } from 'organizations/hooks/useOrganizationsQuery';

export interface SearchResultsTableProps {
    currentPage: number;
    onNextPageClick: (currentPage: number) => void;
    onPreviousPageClick: (previousPage: number) => void;
    queryRef: QueryRef<OrganizationModel, UseOrganizationsVariables> | null;
}

export const SearchResultsTable = ({
    queryRef,
    onNextPageClick,
    onPreviousPageClick,
}: SearchResultsTableProps) => {
    const {} = useReadQuery(queryRef);

    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <button onP>Previous</button>
                    </li>
                    <li>
                        <button>Next</button>
                    </li>
                </ul>
            </nav>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>DBA</th>
                        <th>Rollup ID</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
            <nav>
                <ul>
                    <li>
                        <button>Previous</button>
                    </li>
                    <li>
                        <button>Next</button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

const SearchPage = () => {
    const [searchText, setSearchText] = useState<string>();
    const [selectedOption, setSelectedOption] = useState<string>();
    const [pageNumber, setPageNumber] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(10);

    const { getOrganizations, organizationsQueryRef } = useOrganizationsQuery();

    const searchFormSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const variables: UseOrganizationsVariables = {
            page: pageNumber,
            pageSize,
        };
        switch (selectedOption) {
            case 'id':
                variables.id = searchText;
                break;
            case 'name':
                variables.name = searchText;
                break;
            case 'dba':
                variables.dba = searchText;
                break;
            case 'rollupId':
                variables.rollupId = searchText;
                break;
            default:
                break;
        }
        getOrganizations(variables);
    };

    const nextPageClickHandler = () => {
        setPageNumber((prev) => prev + 1);
    };

    const previousPageClickHander = () => {
        setPageNumber((prev) => (prev === 0 ? prev : prev - 1));
    };

    return (
        <div>
            <form
                id='organization-search-form'
                onSubmit={searchFormSubmitHandler}>
                <fieldset>
                    <legend>Search Form</legend>
                    <div>
                        <label id='search-by-label'>Search By</label>
                        <select
                            value={selectedOption}
                            name='search-select-field'
                            aria-labelledby='search-by-label'
                            defaultValue={'Name'}
                            onChange={(event) =>
                                setSelectedOption(event.currentTarget.value)
                            }>
                            <option
                                key='id'
                                value='id'>
                                ID
                            </option>
                            <option
                                key='name'
                                value='name'>
                                Name
                            </option>
                            <option
                                key='dba'
                                value='dba'>
                                DBA
                            </option>
                            <option
                                key='rollupId'
                                value='rollupId'>
                                Rollup ID
                            </option>
                        </select>
                    </div>
                    <div>
                        <label id='search-text-label'>Search By</label>
                        <input
                            name='search-text-field'
                            aria-labelledby='search-text-label'
                            type='text'
                            value={searchText}
                            onChange={({ currentTarget }) =>
                                setSearchText(currentTarget.value)
                            }
                        />
                    </div>
                </fieldset>
            </form>
            <hr />
            <SearchResultsTable
                onNextPageClick={nextPageClickHandler}
                onPreviousPageClick={previousPageClickHander}
                queryRef={organizationsQueryRef}
            />
        </div>
    );
};

export default SearchPage;
