import React, { useState } from 'react';
import { gpl, useQuery } from '@apollo/client';
import { QueryKeys } from 'organizations/hooks';

const SearchPage = () => {
    const [searchText, setSearchText] = useState<string>();
    const [selectedOption, setSelectedOption] = useState<string>();
    const queryKey = qpl`
		query Organizations($id: String!) {
		  organizations(id $id) {
		    id,
		    name,
		    rollupId,
		    dba
		  }
		}
	`;

    return (
        <div>
            <form id='organization-search-form'>
                <fieldset>
                    <legend>Search Form</legend>
                    <div>
                        <label id='search-by-label'>Search By</label>
                        <select
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
            <div></div>
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
        </div>
    );
};

export default SearchPage;
