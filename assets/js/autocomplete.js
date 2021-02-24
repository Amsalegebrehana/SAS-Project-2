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
      <div class= "row">
      <div class="dropdown">
        <div class="dropdown-menu">
          <div class="dropdown-content results"></div>
        </div>
      </div>
      </div>
      </div>
    `;
  
const input = root.querySelector('input');
const dropdown = root.querySelector('.dropdown');
const resultsWrapper = root.querySelector('.results');

const onInput = async event => {
const items = await fetchData(event.target.value);


}