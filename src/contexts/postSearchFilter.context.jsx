import { createContext, useState } from "react";

export const PostSearchFilterContext = createContext({
	postSearchFilter: '',
	setPostSearchFilter: () => {},
});

export const PostSearchFilterProvider = ({children}) => {

	const [postSearchFilter, setPostSearchFilter] = useState('');

	const value = { postSearchFilter, setPostSearchFilter };

	return (
		<PostSearchFilterContext.Provider value={value}>{children}</PostSearchFilterContext.Provider>
	);

};
