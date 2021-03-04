const autoCompleteConfig = {
    renderOption(book) {

        const bookSrc = book.volumeInfo.imageLinks.smallThumbnail === 'N/A' ? '' : book.volumeInfo.imageLinks.smallThumbnail;
        return `
        <img src="${bookSrc}" />
        ${book.volumeInfo.title} (${book.volumeInfo.publishedDate})
      `;
    },
    inputValue(book) {
        return book.volumeInfo.title;
    },
    async fetchData(searchTerm) {
        const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
            params: {
                q: searchTerm,
                key: 'AIzaSyDoB7GTV_zWNG7Ad1P56fwweclsj7GsmWE'
            }
        });

        if (response.data.Error) {
            return [];
        }

        return response.data.items;
    }
};
createAutoComplete({
    ...autoCompleteConfig,
    root: document.querySelector('#left-autocomplete'),
    onOptionSelect(book) {
        document.querySelector('.tut2').classList.remove('bg-overlayspec');
        document.querySelector('.tut2').classList.add('specc');
        onBookSelect(book, document.querySelector('#left-summary'), 'left');
    }
});

let leftBook;

const onBookSelect = async (book, summaryElement) => {

    const response = await axios.get(book.selfLink);


    summaryElement.innerHTML = bookTemplate(response.data);

};

const bookTemplate = (book) => {

    console.log(book);



};