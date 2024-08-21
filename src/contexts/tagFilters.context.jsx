import { createContext, useEffect, useState } from "react";

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
	filtersAreActive: false,
	setFiltersAreActive: () => {},
	selectedTags: [],
	setSelectedTags: () => {},
	onTagSelected: () => {}, 
	onTagDeselected: () => {},
});

export const TagFiltersProvider = ({children}) => {

	const [filtersAreActive, setFiltersAreActive] = useState(false);
	const [selectedTags, setSelectedTags] = useState([]);

	useEffect( () => {
		if ( selectedTags.length > 0 ) {
			setFiltersAreActive(true);
		} else {
			setFiltersAreActive(false);
		}
		console.log('selectedTags = ', selectedTags);
	}, [selectedTags]);

	const onTagSelected = ( tagToSelect ) => {
		console.log('tag selected');
		setSelectedTags( addSelectedTag(selectedTags, tagToSelect) );
	};

	const onTagDeselected = ( tagToRemove ) => {
		console.log('tag deselected');
		setSelectedTags( removeSelectedTag(selectedTags, tagToRemove) );
	};

	const value = { filtersAreActive, setFiltersAreActive, selectedTags, setSelectedTags, onTagSelected, onTagDeselected };

	return (
		<TagFiltersContext.Provider value={value}>{children}</TagFiltersContext.Provider>
	);

};
