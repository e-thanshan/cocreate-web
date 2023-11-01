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
      <div className="pt-5">
        <div id="dropdownButton" data-dropdown-toggle="dropdown" className="group justify-between items-center flex border-2 w-5/6 h-10 rounded-lg">
          <div className="flex px-2">
            <svg width="54" height="21" viewBox="0 0 54 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 12.5C0 7.80558 3.80558 4 8.5 4H45.5C50.1944 4 54 7.80558 54 12.5C54 17.1944 50.1944 21 45.5 21H8.5C3.80558 21 0 17.1944 0 12.5Z" fill="#1B9AAA" />
              <path d="M42.25 14.75L46.75 10.25M42.25 10.25L46.75 14.75" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M10.6648 8.72727H11.5455V13.9261C11.5455 14.3902 11.4602 14.7843 11.2898 15.1087C11.1193 15.433 10.879 15.6792 10.5689 15.8473C10.2588 16.0154 9.89299 16.0994 9.47159 16.0994C9.07386 16.0994 8.71993 16.0272 8.4098 15.8828C8.09967 15.736 7.85582 15.5277 7.67827 15.2578C7.50071 14.9879 7.41193 14.6671 7.41193 14.2955H8.27841C8.27841 14.5014 8.32931 14.6813 8.43111 14.8352C8.53527 14.9867 8.67732 15.1051 8.85724 15.1903C9.03717 15.2756 9.24195 15.3182 9.47159 15.3182C9.72491 15.3182 9.94034 15.2649 10.1179 15.1584C10.2955 15.0518 10.4304 14.8956 10.5227 14.6896C10.6174 14.4813 10.6648 14.2268 10.6648 13.9261V8.72727ZM14.8018 16.1278C14.4562 16.1278 14.1425 16.0627 13.8608 15.9325C13.5791 15.8 13.3554 15.6094 13.1896 15.3608C13.0239 15.1098 12.9411 14.8068 12.9411 14.4517C12.9411 14.1392 13.0026 13.8859 13.1257 13.6918C13.2488 13.4953 13.4134 13.3414 13.6193 13.2301C13.8253 13.1188 14.0526 13.036 14.3011 12.9815C14.5521 12.9247 14.8042 12.8797 15.0575 12.8466C15.389 12.804 15.6577 12.772 15.8636 12.7507C16.072 12.727 16.2235 12.688 16.3182 12.6335C16.4152 12.5791 16.4638 12.4844 16.4638 12.3494V12.321C16.4638 11.9706 16.3679 11.6984 16.1761 11.5043C15.9867 11.3101 15.6991 11.2131 15.3132 11.2131C14.9131 11.2131 14.5994 11.3007 14.3722 11.4759C14.1449 11.651 13.9851 11.8381 13.8928 12.0369L13.0973 11.7528C13.2393 11.4214 13.4287 11.1634 13.6655 10.9787C13.9046 10.7917 14.165 10.6615 14.4467 10.5881C14.7308 10.5123 15.0102 10.4744 15.2848 10.4744C15.46 10.4744 15.6612 10.4957 15.8885 10.5384C16.1181 10.5786 16.3395 10.6626 16.5526 10.7905C16.768 10.9183 16.9467 11.1113 17.0888 11.3693C17.2308 11.6274 17.3018 11.973 17.3018 12.4062V16H16.4638V15.2614H16.4212C16.3643 15.3797 16.2696 15.5064 16.1371 15.6413C16.0045 15.7763 15.8281 15.8911 15.608 15.9858C15.3878 16.0805 15.1191 16.1278 14.8018 16.1278ZM14.9297 15.375C15.2611 15.375 15.5405 15.3099 15.7678 15.1797C15.9974 15.0495 16.1702 14.8814 16.2862 14.6754C16.4046 14.4695 16.4638 14.2528 16.4638 14.0256V13.2585C16.4283 13.3011 16.3501 13.3402 16.2294 13.3757C16.111 13.4089 15.9737 13.4384 15.8175 13.4645C15.6636 13.4882 15.5133 13.5095 15.3665 13.5284C15.2221 13.545 15.1049 13.5592 15.0149 13.571C14.7971 13.5994 14.5935 13.6456 14.4041 13.7095C14.2171 13.7711 14.0656 13.8646 13.9496 13.9901C13.8359 14.1132 13.7791 14.2812 13.7791 14.4943C13.7791 14.7855 13.8868 15.0057 14.1023 15.1548C14.3201 15.3016 14.5959 15.375 14.9297 15.375ZM23.0964 10.5455L21.0794 16H20.2271L18.21 10.5455H19.1191L20.6248 14.892H20.6816L22.1873 10.5455H23.0964ZM25.6417 16.1278C25.296 16.1278 24.9824 16.0627 24.7006 15.9325C24.4189 15.8 24.1952 15.6094 24.0295 15.3608C23.8638 15.1098 23.7809 14.8068 23.7809 14.4517C23.7809 14.1392 23.8424 13.8859 23.9656 13.6918C24.0887 13.4953 24.2532 13.3414 24.4592 13.2301C24.6651 13.1188 24.8924 13.036 25.141 12.9815C25.3919 12.9247 25.6441 12.8797 25.8974 12.8466C26.2288 12.804 26.4975 12.772 26.7035 12.7507C26.9118 12.727 27.0633 12.688 27.158 12.6335C27.2551 12.5791 27.3036 12.4844 27.3036 12.3494V12.321C27.3036 11.9706 27.2077 11.6984 27.016 11.5043C26.8266 11.3101 26.5389 11.2131 26.1531 11.2131C25.753 11.2131 25.4393 11.3007 25.212 11.4759C24.9847 11.651 24.8249 11.8381 24.7326 12.0369L23.9371 11.7528C24.0792 11.4214 24.2686 11.1634 24.5053 10.9787C24.7444 10.7917 25.0049 10.6615 25.2866 10.5881C25.5707 10.5123 25.85 10.4744 26.1246 10.4744C26.2998 10.4744 26.5011 10.4957 26.7283 10.5384C26.958 10.5786 27.1793 10.6626 27.3924 10.7905C27.6078 10.9183 27.7866 11.1113 27.9286 11.3693C28.0707 11.6274 28.1417 11.973 28.1417 12.4062V16H27.3036V15.2614H27.261C27.2042 15.3797 27.1095 15.5064 26.9769 15.6413C26.8443 15.7763 26.668 15.8911 26.4478 15.9858C26.2276 16.0805 25.9589 16.1278 25.6417 16.1278ZM25.7695 15.375C26.101 15.375 26.3803 15.3099 26.6076 15.1797C26.8372 15.0495 27.0101 14.8814 27.1261 14.6754C27.2444 14.4695 27.3036 14.2528 27.3036 14.0256V13.2585C27.2681 13.3011 27.19 13.3402 27.0692 13.3757C26.9509 13.4089 26.8136 13.4384 26.6573 13.4645C26.5034 13.4882 26.3531 13.5095 26.2063 13.5284C26.0619 13.545 25.9447 13.5592 25.8548 13.571C25.637 13.5994 25.4334 13.6456 25.244 13.7095C25.0569 13.7711 24.9054 13.8646 24.7894 13.9901C24.6758 14.1132 24.619 14.2812 24.619 14.4943C24.619 14.7855 24.7267 15.0057 24.9421 15.1548C25.1599 15.3016 25.4357 15.375 25.7695 15.375Z" fill="white" />
            </svg>

            <svg width="54" height="21" viewBox="0 0 54 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 12.5C0 7.80558 3.80558 4 8.5 4H45.5C50.1944 4 54 7.80558 54 12.5C54 17.1944 50.1944 21 45.5 21H8.5C3.80558 21 0 17.1944 0 12.5Z" fill="#1B9AAA" />
              <path d="M42.25 14.75L46.75 10.25M42.25 10.25L46.75 14.75" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M13.733 11H12.8523C12.8002 10.7467 12.709 10.5241 12.5788 10.3324C12.451 10.1406 12.2947 9.97964 12.1101 9.84943C11.9278 9.71686 11.7254 9.61742 11.5028 9.55114C11.2803 9.48485 11.0483 9.4517 10.8068 9.4517C10.3665 9.4517 9.96757 9.56297 9.61009 9.78551C9.25497 10.008 8.97206 10.3359 8.76136 10.7692C8.55303 11.2024 8.44886 11.7339 8.44886 12.3636C8.44886 12.9934 8.55303 13.5249 8.76136 13.9581C8.97206 14.3913 9.25497 14.7192 9.61009 14.9418C9.96757 15.1643 10.3665 15.2756 10.8068 15.2756C11.0483 15.2756 11.2803 15.2424 11.5028 15.1761C11.7254 15.1098 11.9278 15.0116 12.1101 14.8814C12.2947 14.7488 12.451 14.5866 12.5788 14.3949C12.709 14.2008 12.8002 13.9782 12.8523 13.7273H13.733C13.6667 14.099 13.5459 14.4316 13.3707 14.7251C13.1955 15.0187 12.9777 15.2685 12.7173 15.4744C12.4569 15.678 12.1645 15.8331 11.8402 15.9396C11.5182 16.0462 11.1738 16.0994 10.8068 16.0994C10.1866 16.0994 9.63494 15.9479 9.15199 15.6449C8.66903 15.3419 8.28906 14.911 8.01207 14.3523C7.73509 13.7936 7.59659 13.1307 7.59659 12.3636C7.59659 11.5966 7.73509 10.9337 8.01207 10.375C8.28906 9.81629 8.66903 9.38542 9.15199 9.08239C9.63494 8.77936 10.1866 8.62784 10.8068 8.62784C11.1738 8.62784 11.5182 8.68111 11.8402 8.78764C12.1645 8.89418 12.4569 9.05043 12.7173 9.25639C12.9777 9.45999 13.1955 9.70857 13.3707 10.0021C13.5459 10.2933 13.6667 10.6259 13.733 11ZM17.1731 14.7216V10.0341H17.9686V14.7216H17.1731ZM15.2271 12.7756V11.9801H19.9146V12.7756H15.2271ZM23.7649 14.7216V10.0341H24.5604V14.7216H23.7649ZM21.8189 12.7756V11.9801H26.5064V12.7756H21.8189Z" fill="white" />
            </svg>
          </div>
          <div className="pr-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.5 8.25L12 15.75L4.5 8.25" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
          <ul class="absolute hidden group-hover:block pt-40 w-[30%]">
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

      <h2 className="pt-32 text-lg">Topics</h2>

      <div className="justify-between items-center flex border-2 w-5/6 h-10 rounded-lg">
        <input type="text" className="w-full h-full pl-2" placeholder="Filter by topic..."></input>
        <div className="pr-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4.5V19.5M19.5 12L4.5 12" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
      </div>
      <div className="pt-2">
        <div className="justify-between items-center flex border-2 w-5/6 h-40 rounded-lg">
        </div>
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




