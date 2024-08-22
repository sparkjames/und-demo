import { createContext, useState } from "react";

const addSelectedTag = ( tags = [], tagNameToAdd ) => {

	// Check if the tagNameToAdd already exists in the array.
	const existingTag = tags.find( (tag) => tag === tagNameToAdd );

	// Add the tag to the selectedTags array but only if it's not already in the array.
	if ( ! existingTag ) {
		return [...tags, tagNameToAdd];
	}
	
	// ... otherwise return an array with the added tag.
	return tags;
};

const removeSelectedTag = ( tags = [], tagNameToRemove ) => {
	return tags.filter( (tag) => tag !== tagNameToRemove );
};

export const TagFiltersContext = createContext({
	selectedTags: [],
	setSelectedTags: () => {},
	onTagSelected: () => {}, 
	onTagDeselected: () => {},
});

export const TagFiltersProvider = ({children}) => {

	const [selectedTags, setSelectedTags] = useState([]);

	const onTagSelected = ( tagToSelect ) => {
		// console.log('tag selected');
		setSelectedTags( addSelectedTag(selectedTags, tagToSelect) );
	};

	const onTagDeselected = ( tagToRemove ) => {
		// console.log('tag deselected');
		setSelectedTags( removeSelectedTag(selectedTags, tagToRemove) );
	};

	const value = { selectedTags, setSelectedTags, onTagSelected, onTagDeselected };

	return (
		<TagFiltersContext.Provider value={value}>{children}</TagFiltersContext.Provider>
	);

};
