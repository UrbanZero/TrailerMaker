import { useState } from "react";

interface TextEditorProps {
    setText: (text: string) => void;
}

const TextEditor = ({ setText }: TextEditorProps) => {
    const [text, setLocalText] = useState('');

    const handleSubmit = () => {
        setText(text ? text : "The untold story\nof an user\nwho forgot adding text...\nFrom the creators of Shrek:\nThe White Space");
    };

    return (
        <div className="flex flex-col items-center">
            <h1 className="mb-10">TRAILER MAKER ONLINE</h1>
            <h2>Your trailer text, separate it by lines:</h2>
            <textarea
                className="w-70 h-40 p-2 bg-gray-800 text-white border border-gray-600"
                placeholder="Enter text here..."
                value={text}
                onChange={(e) => setLocalText(e.target.value)}
            />
            <button
                onClick={handleSubmit}
                className="mt-4 p-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
                Watch trailer
            </button>
        </div>
    );
};

export default TextEditor;
