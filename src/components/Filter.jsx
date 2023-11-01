const Filter = ({ data }) => {
    return (
        <div className="">
            <div className="justify-between items-center flex border-2 w-5/6 h-10 rounded-lg">
                <input type="text" className="w-full h-full pl-2"></input>
                <div className="pr-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 21L15.8033 15.8033M15.8033 15.8033C17.1605 14.4461 18 12.5711 18 10.5C18 6.35786 14.6421 3 10.5 3C6.35786 3 3 6.35786 3 10.5C3 14.6421 6.35786 18 10.5 18C12.5711 18 14.4461 17.1605 15.8033 15.8033Z" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
            </div>

            <div id="dropdownButton" data-dropdown-toggle="dropdown" className="group justify-between items-center flex border-2 w-5/6 h-10 rounded-lg">
                <div className="pr-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.5 8.25L12 15.75L4.5 8.25" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
                <ul class="absolute hidden text-gray-700 group-hover:block pt-20 w-[30%]">
                    <li>
                        <div className="justify-between items-center flex border-2 w-5/6 h-10 rounded-lg">
                            <input type="text" className="w-full h-full pl-2"></input>
                        </div>
                    </li>
                    <li>
                        <div className="justify-between items-center flex border-2 w-5/6 h-10 rounded-lg">
                            <input type="text" className="w-full h-full pl-2"></input>
                        </div>
                    </li>
                    <li>
                        <div className="justify-between items-center flex border-2 w-5/6 h-10 rounded-lg">
                            <input type="text" className="w-full h-full pl-2"></input>
                        </div>
                    </li>
                </ul>
            </div>

        </div>
    );
}

export default Filter;

{/* <div class="relative group inline-block">
  <button class="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center">
    <span>Dropdown</span>
    <svg
      class="h-4 w-4 ml-2"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M19 9l-7 7-7-7"
      ></path>
    </svg>
  </button>
  <ul class="absolute hidden text-gray-700 pt-2 group-hover:block">
    <li>
      <a href="#" class="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap">Option 1</a>
    </li>
    <li>
      <a href="#" class="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap">Option 2</a>
    </li>
    <li>
      <a href="#" class="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap">Option 3</a>
    </li>
  </ul>
</div> */}




