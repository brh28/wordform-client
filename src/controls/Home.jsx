import React, { useState } from 'react';
import { SearchFilters, Articles} from './articles'

const Home = ({ userId }) => {
	const [searchParams, setSearchParams] = useState();
	return (<div>
		<SearchFilters onUpdate={(p) => setSearchParams(p)} />
		<Articles searchBy={searchParams} />
	</div>)
}

export default Home;