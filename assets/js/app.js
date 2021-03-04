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
