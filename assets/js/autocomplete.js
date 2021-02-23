const createAutoComplete = ({
    root,
    renderOption,
    onOptionSelect,
    inputValue,
    fetchData
  }) => {
    root.innerHTML = `
    <div class="container py-4 searchbar" >
    
      <div class= "row  mx-auto">
      <input class="input" placeholder="Search..." />
      </div>
      
      </div>
    `;
  

    }