import React from "react";
import TestButton from "../components/TestButton";

function Home({ onButtonClick }) {
    console.log('home');
    return (
        <div>
            <TestButton></TestButton>
            Home
            <button onClick={onButtonClick}>Click me to `Test`!</button>
        </div>
    );
}

export default Home;