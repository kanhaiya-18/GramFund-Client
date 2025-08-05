import { useState } from "react";
import Faq from "./Faq";

function Faqsec() {
    const [showQ1, setShowQ1] = useState(false);
    const [showQ2, setShowQ2] = useState(false);
    const [showQ3, setShowQ3] = useState(false);
    return (
         <section className="flex flex-col items-center mx-auto text-center">
            <h1 className="text-4xl text-indigo-700 font-semibold my-6">
                Frequently Asked Questions
            </h1>
            <Faq
                que="What is GramFund ?"
                ans="GramFund is a digital initiative to bring transparency and accountability to the way government funds are used in your village. Through this portal,villagers can easily see"
                showContent={showQ1}
                setshowContent={setShowQ1}
            />
            <Faq
                que="Where does the fund data come from?"
                ans="The fund data is provided by the village authorities or linked government departments. It is regularly updated to keep everyone informed."
                showContent={showQ2}
                setshowContent={setShowQ2}
            />
            <Faq
                que="Is my identity protected when I raise a complaint?"
                ans="Yes. Your details will not be shared with the public. Only the admin can see who raised the query for verification."
                showContent={showQ3}
                setshowContent={setShowQ3}
            />
            <div className="m-5"></div>
        </section>

    );
}
export default Faqsec;