import React from "react";

export default function TestButton({ onButtonClick }) {
    console.log('test');
    return <button onClick={onButtonClick}>Click me to `Test`!</button>;
}