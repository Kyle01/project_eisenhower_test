'use client';

interface ButtonProps {
    label: string;
    onClick: () => void;
}

export default function Button({ label, onClick }: ButtonProps) {
    return (
        <button 
            onClick={onClick} 
            className="bg-shamrock-400 text-white px-4 py-2 rounded-md hover:bg-shamrock-600 cursor-pointer"
        >
            {label}
        </button>
    );
}

