import SidebarList from "./SideBarList";

export default function Sidebar({ list, selectedIndex, onSelect }) {
    return (
        <div className="w-full h-full bg-[#1C1B21]">
            <div className="w-full flex justify-center items-center">
                <a href="/" className="flex items-center mt-[20px]">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.7812 4.04126C17.7094 4.04126 15.2344 6.51626 15.2344 9.58814C15.2344 12.66 17.7094 15.1352 20.7812 15.1352C23.8531 15.1352 26.3281 12.6599 26.3281 9.58814C26.3281 6.51626 23.8531 4.04126 20.7812 4.04126ZM9.53125 6.54126C7.14977 6.54126 5.23438 8.45665 5.23438 10.8381C5.23438 13.2195 7.14977 15.1352 9.53125 15.1352C11.9127 15.1352 13.8281 13.2195 13.8281 10.8381C13.8281 8.45673 11.9127 6.54126 9.53125 6.54126ZM7.73438 16.5413V25.1352H26.3281V16.5413H7.73438ZM35.0781 16.9044L27.7344 20.0517V21.6245L35.0781 24.7718V16.9044ZM4.92188 17.0881V19.5881H6.32812V17.0881H4.92188ZM13.75 26.5414V27.9475H14.7666L10.7726 38.594H12.2743L16.2983 27.9475L16.3281 38.594H17.7344L17.7642 27.9475L21.7882 38.594H23.2899L19.2959 27.9475H20.3125V26.5414C18.1248 26.5412 15.9377 26.5414 13.75 26.5414Z" fill="#B4D429" />
                    </svg>
                    <p className="font-mono font-bold text-[20px] text-[#B4D429]">TroocBooking</p>
                </a>
            </div>
            <div className="w-full mt-[30px]">
                <SidebarList
                    list={list}
                    onSelect={onSelect}
                    selectedIndex={selectedIndex} />
            </div>
        </div>
    );
}