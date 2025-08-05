function Faq({ que, ans, showContent, setshowContent }) {
    return (
            <div className="my-2 py-2 md:w-[600px] w-[400px] bg-white rounded-md px-6">
                <h2 className=" flex justify-between px-7 text-xl items-center font-semibold text-gray-800 ">
                    {que}
                    {!showContent ? (<button onClick={() => setshowContent(true)}> ➕ </button>) :
                        (<button onClick={() => setshowContent(false)}> ➖ </button>)}
                </h2>
                {showContent && <p className="text-gray-700 text-base text-left pl-6 mt-2 mr-2 ">
                    {ans}
                </p>}
            </div>
    );
}
export default Faq;