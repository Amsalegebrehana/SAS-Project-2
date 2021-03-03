// https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=yourAPIKey

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

  const date = parseInt(book.volumeInfo.publishedDate);
  const rating = parseFloat(book.volumeInfo.averageRating);
  const count = parseInt(book.volumeInfo.pageCount);
  const pdfAvailabilty = book.accessInfo.pdf.isAvailable;
  const link = book.volumeInfo.previewLink;

  console.log(book);
  return `
    <article class="media" >
      <figure class="card media-left"   >
        <p class="card-img image">
          <img src="${book.volumeInfo.imageLinks.medium}" />
        </p>
      </figure>
      <div class="card media-content">
        <div class="content">
  
  <h1 style="font-family: 'Akaya Kanadaka', cursive;, serif; ">${book.volumeInfo.title}</h1>
          <h4>${book.volumeInfo.authors}</h4>
          
        </div>
      </div>
    </article>
    <article data-value=${date} class="notification is-primary">
    <p class="subtitle">Date published</p>
    <p class="title"> ${book.volumeInfo.publishedDate}</p>
  </article>
 
 
  <article data-value=${count} class="notification is-primary">
  <p class="subtitle">Page Count</p>
    <p class="title">${book.volumeInfo.pageCount}</p>
    
  </article>
  <article data-value=${pdfAvailabilty} class="notification is-primary">
    <p class="title">${book.accessInfo.pdf.isAvailable ? 'Available' : 'Not Available'}</p>
    <p class="subtitle">in PDF Format</p>
  </article>
  <article data-value=${link} class="  is-primary">
    <a class= "subtitle titleLink btn" href=${book.volumeInfo.previewLink}>Preview</a>
  
  </article>


 
  `;
};
