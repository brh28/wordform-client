import React, { useState } from 'react';
import { SearchFilters, Articles} from './articles'

export const PATH = '/';

const Home = () => {
	const [searchParams, setSearchParams] = useState();
	return (<div>
		<SearchFilters onUpdate={(p) => setSearchParams(p)} />
		<Articles searchBy={searchParams} />
	</div>)
}

export default Object.assign(Home, { PATH: PATH })